
//bring in the middleware
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/error');
const Course = require('../models/Courses');

// @desc    Fetch all courses
// @desc    GET  /api/v1/courses/
// @access  Public

// @desc    GET /api/v1/:bootcampid/courses
// @access  Private

exports.getCourses =  asyncHandler(async (req, res, next) => {

// fetch all bootcamps
const courses = await Course.find({})
  res.status(200).json({
    success: true,
    data: courses
  })
})
