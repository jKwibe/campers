// Importing the Bootcamp database
const Bootcamp = require('../models/Bootcamps');

const ErrorResponse = require('../helpers/error');
const asyncHandler = require('../middleware/async');


// @desc    Fetch all bootcamps
// @desc    GET  /api/v1/bootcamps/
// @access  Public
exports.getBootCamps = asyncHandler(async (req, res, next)=>{
    const bootcamps = await Bootcamp.find({})
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

})
