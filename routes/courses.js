
const express = require('express');
const router = express.Router({mergeParams: true});

// Import the courses controllers
const {getCourses, getSingleCourse, updateCourse} = require('../controllers/courses');



router.route("/")
      .get(getCourses)

router.route("/:id")
      .get(getSingleCourse)
      .put(updateCourse)

module.exports = router;
