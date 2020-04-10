// Importing the Bootcamp database
const Bootcamp = require('../models/Bootcamps');

const ErrorResponse = require('../helpers/error');
const asyncHandler = require('../middleware/async');

const geocoder = require('../helpers/geocoder');


// @desc    Fetch all bootcamps
// @desc    GET  /api/v1/bootcamps/
// @access  Public
exports.getBootCamps = asyncHandler(async (req, res, next)=>{

//getting a copy of the query params
const reqQuery = {...req.query};

let paramFields = ['select','sort','limit','page'];

paramFields.forEach((param) => {
  delete reqQuery[param];
});

// console.log(reqQuery);
// ctreate a string from the reqQuery object
let querystring = JSON.stringify(reqQuery);
  querystring = querystring.replace(/\b gt|gte|lt|lte|in\b/g, match=> `$${match}`);
// console.log(querystring);
let query = Bootcamp
                    .find(JSON.parse(querystring))
                    .populate({
                      path: 'courses',
                      select: 'weeks, tuition, title description'
                    });

  // console.log(req.query.sort);

//select
if(req.query.select){
 const fields = req.query.select.split(",").join(" ");
 query = query.select(fields);
}

//sortBy
if(req.query.sort){
 const sortBy = req.query.sort.split(",").join(" ");
 query = query.sort(sortBy);
}else{
  query = query.sort('-createdAt');
}

// pagination
const page = parseInt(req.query.page, 10) || 1;
const limit = parseInt(req.query.limit, 10)|| 25;
const startIndex = (page - 1) * limit;
const endIndex = page * limit;
const total = await Bootcamp.countDocuments();

query = query.skip(startIndex).limit(limit);

    const bootcamps = await query

  //creating pagination object to be displayed in the user API
  // it will show the limit, next page and previous page
    const pagination = {};

    if(endIndex < total){
      pagination.next ={
        page: page + 1,
        limit
      };
    }

    if(startIndex > 0){
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    // send the response

      res.status(200).json({
          success: true,
          count: bootcamps.length,
          pagination,
          data: bootcamps
      });

});

// @desc    Create a bootcamp
// @desc    POST  /api/v1/bootcamps/
// @access  Private
exports.createBootCamps = asyncHandler(async (req, res, next)=>{
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
});

// @desc    Fetch one bootcamp
// @desc    GET  /api/v1/bootcamps/:id
// @access  Public
exports.getSingleBootcamp = asyncHandler(async (req, res, next)=>{

    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp){
      return next(new ErrorResponse(`Resource not found with the id ${req.params.id}`, 404));
    }
    res.status(200).json({
      success: true,
      data: bootcamp
    });
});


// @desc    Update a bootcamp
// @desc    PUT  /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) =>{

    const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if(!deletedBootcamp){
      return next(
        new ErrorResponse(`Resource not found with the id ${req.params.id}`, 404 )
      )
    }

    res.status(200).json({
        success: true,
        data: deletedBootcamp
    });
});

// @desc    Delete bootcamps
// @desc    DELETE  /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next)=>{

    const updatedBootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body , {
      new: true,
      runValidators: true
    });
// if the id does not match the bootcamp
    if(!updatedBootcamp){
      return next(
        new ErrorResponse(`Resource not found with the id ${req.params.id}`, 404 )
      )
    }

    // console.log(updateBootcamp);
    res.status(200).json({
        success: true,
        data: updatedBootcamp
    })

});

// @desc    Get bootcaps in an area
// @desc    GET  /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Public
exports.getBootcampsInRadius= asyncHandler(async (req, res, next)=>{
  const {zipcode, distance}  = req.params;

  // Get latitude and longitude from the Geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // calculate radius radius
  // Divide distance by radius of the earth
  // Earth == 3963 miles || 6378;

  const radius = distance / 3963 ;
  const bootcamps = await Bootcamp.find({
    location: {$geoWithin: { $centerSphere: [ [ lng, lat ], radius ] }}
  });

  res.status(200).json({
    success:true,
    count: bootcamps.length,
    data: bootcamps
  })
})
