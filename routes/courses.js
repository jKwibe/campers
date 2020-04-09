
const express = require('express');
const router = express.Router();

// Import the courses controllers
const {getAllCourses} = require('../controllers/courses');



router.route("/")
      .get(getAllCourses)
      .post()



module.exports = router;
