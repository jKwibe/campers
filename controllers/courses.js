
//bring in the middleware
const asyncHandler = require('../middleware/async');


exports.getAllCourses =  (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Hello there we are in the courses route"
  })
}
