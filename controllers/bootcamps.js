// Importing the Bootcamp database
const Bootcamp = require('../models/Bootcamps');

const ErrorResponse = require('../helpers/error');


// @desc    Fetch all bootcamps
// @desc    GET  /api/v1/bootcamps/
// @access  Public
exports.getBootCamps = async (req, res, next)=>{
  try {
    const bootcamps = await Bootcamp.find({})
      res.status(200).json({
          success: true,
          count: bootcamps.length,
          data: bootcamps.reverse()
      });
  } catch (err) {

    next(new ErrorResponse(`Resource not found`, 400))
  }

}

// @desc    Create a bootcamp
// @desc    POST  /api/v1/bootcamps/
// @access  Private
exports.createBootCamps = async (req, res, next)=>{
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    })
  } catch (err) {

    next(new ErrorResponse(`Resource not found with the id ${req.params.id}`, 404))
  }

}

// @desc    Fetch one bootcamp
// @desc    GET  /api/v1/bootcamps/:id
// @access  Public
exports.getSingleBootcamp = async (req, res, next)=>{

  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    res.status(200).json({
      sucess: true,
      data: bootcamp
    })
  } catch (err) {

    next(new ErrorResponse(`Resource not found with the id ${req.params.id}`, 404))
  }
}


// @desc    Update a bootcamp
// @desc    PUT  /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) =>{

  try {
    const deletedBootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if(!deletedBootcamp){
      return next(
        new ErrorResponse(`Resource not found with the id ${req.params.id}`, 404 )
      )
    }

    res.status(200).json({
        sucess: true,
        data: deletedBootcamp
    })
  } catch (err) {

    next(new ErrorResponse(`Resource not found with the id ${req.params.id}`, 404))
  }
}

// @desc    Delete bootcamps
// @desc    DELETE  /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next)=>{

  try {
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
        sucess: true,
        data: updatedBootcamp
    })
  } catch (err) {

    next(new ErrorResponse(`Resource not found with the id ${req.params.id}`, 404))
  }
}
