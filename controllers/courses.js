
//bring in the middleware
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../helpers/error');
const Course = require('../models/Courses');
const Bootcamp = require('../models/Bootcamps');


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
  //populating the courses
  query = Course.find().populate({
    path: 'bootcamp',
    select: 'name description website phoneNo email'
  });
}

// fetch all courses even with a single bootcamp or display all courses
const courses = await query;
  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });
});

// @desc    Fetch single courses
// @desc    GET  /api/v1/courses/:id
// @access  Public


exports.getSingleCourse =  asyncHandler(async (req, res, next) => {

const course = await Course
                      .findById(req.params.id)
                      .populate({
                        path: 'bootcamp',
                        select: 'name description'
                      });
// Check if the course does not exist
if (!course){
  return next(new ErrorResponse(`Course does not exist with the id ${req.params.id}`, 404));
}



// fetch a single course using the id
  res.status(200).json({
    success: true,
    data: course
  });
});
// @desc    Add Course
// @desc    POST  /api/v1/bootcamps/:bootcampid/courses
// @access  Private


exports.addCourse =  asyncHandler(async (req, res, next) => {

  // assign the bootcamp id to  be added in the course bootcamp field
req.body.bootcamp = req.params.bootcampid;

const bootcamp = await Bootcamp.findById(req.params.bootcampid);
// Check if the course does not exist
if (!bootcamp){
  return next(new ErrorResponse(`Bootcamp does not exist with the id ${req.params.bootcampid}`, 404));
}

const course = await Course.create(req.body);



// fetch a single course using the id
  res.status(200).json({
    success: true,
    data: course
  });
});


// @desc    Update Course
// @desc    PUT /api/v1/courses/:id
// @access  Private
exports.updateCourse =  asyncHandler(async (req, res, next) => {

let course = await Course.findById(req.params.id);
// Check if the course does not exist
if (!course){
  return next(new ErrorResponse(`Course does not exist with the id ${req.params.bootcampid}`, 404));
}

course = await Course.findByIdAndUpdate(req.params.id, req.body , {
  new: true,
  runValidators: true
});

// fetch a single course using the id
  res.status(200).json({
    success: true,
    data: course
  });
});



// @desc    Delete Course
// @desc    DELETE /api/v1/courses/:id
// @access  Private
exports.deleteCourse =  asyncHandler(async (req, res, next) => {

let course = await Course.findById(req.params.id);
// Check if the course does not exist
if (!course){
  return next(new ErrorResponse(`Course does not exist with the id ${req.params.bootcampid}`, 404));
}

course = await course.remove()

// fetch a single course using the id
  res.status(200).json({
    success: true,
    data: {}
  });
});
