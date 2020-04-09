
const express = require('express');
const router = express.Router();

// Import the courses controllers
const {getCourses} = require('../controllers/courses');



router.route("/")
      .get(getCourses)
      .post()



module.exports = router;
