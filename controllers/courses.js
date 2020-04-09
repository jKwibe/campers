
//bring in the middleware
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/error');
const Course = require('../models/Courses');

// @desc    Fetch all courses
// @desc    GET  /api/v1/courses/
// @desc    GET /api/v1/bootcamps/:bootcampid/courses
// @access  Public


exports.getCourses =  asyncHandler(async (req, res, next) => {

let query;

// console.log(req.params.bootcampid)
  // Check for the parameter if it has a bootcamp id and sort for courses with that id

if(req.params.bootcampid){

  query= Course.find({bootcamp: req.params.bootcampid});

}else{
  query = Course.find({});
}

// fetch all courses even with a single bootcamp or display all courses
const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  })
})
