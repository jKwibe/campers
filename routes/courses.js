
const express = require('express');
const router = express.Router({mergeParams: true});

const responseMiddleware = require('../middleware/responseMid');

// Import the courses controllers
const {
        getCourses,
        getSingleCourse,
        updateCourse,
        deleteCourse
      } = require('../controllers/courses');

      const Courses = require('../models/Courses');



router.route("/")
      .get(responseMiddleware(Courses, {
        path: 'bootcamp',
        select: 'name description website phoneNo email'
      }),getCourses)

router.route("/:id")
      .get(getSingleCourse)
      .put(updateCourse)
      .delete(deleteCourse)


module.exports = router;
