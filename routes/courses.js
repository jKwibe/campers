
const express = require('express');
const router = express.Router({mergeParams: true});

// Import the courses controllers
const {getCourses, getSingleCourse} = require('../controllers/courses');



router.route("/")
      .get(getCourses)
      .post()

router.route("/:id")
      .get(getSingleCourse)

module.exports = router;
