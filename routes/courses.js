
const express = require('express');
const router = express.Router({mergeParams: true});

// Import the courses controllers
const {
        getCourses,
        getSingleCourse,
        updateCourse,
        deleteCourse
      } = require('../controllers/courses');



router.route("/")
      .get(getCourses)

router.route("/:id")
      .get(getSingleCourse)
      .put(updateCourse)
      .delete(deleteCourse)


module.exports = router;
