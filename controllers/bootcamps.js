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

let paramFields = ['select'];

paramFields.forEach((param) => {
  delete reqQuery[param];
});

// console.log(reqQuery);
// ctreate a string from the reqQuery object
let querystring = JSON.stringify(reqQuery);
  querystring = querystring.replace(/\b gt|gte|lt|lte|in\b/g, match=> `$${match}`);
// console.log(querystring);
let query = Bootcamp.find(JSON.parse(querystring));
console.log(req.query.select);
if(req.query.select){
 const fields = req.query.select.split(",").join(" ");
 query = query.select(fields);
}


    const bootcamps = await query;
      res.status(200).json({
          success: true,
          count: bootcamps.length,
          data: bootcamps.reverse()
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
