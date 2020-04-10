

const express = require('express');
const responseMiddleware = require('../middleware/responseMid');

const router = express.Router();

// importing the controllers

const { getBootCamps,
        createBootCamps,
        getSingleBootcamp,
        deleteBootcamp,
        updateBootcamp,
        getBootcampsInRadius
    } = require('../controllers/bootcamps');

    const Bootcamps = require('../models/Bootcamps');

// Get other controllers from other resources
const {getCourses, addCourse} = require('../controllers/courses');


router.route('/:bootcampid/courses')
      .get(getCourses)
      .post(addCourse)

 router.route('/')
       .get(responseMiddleware(Bootcamps, 'courses'),getBootCamps)
       .post(createBootCamps);

 router.route('/:id')
        .get(getSingleBootcamp)
        .delete(deleteBootcamp)
        .put(updateBootcamp)

 router.route('/radius/:zipcode/:distance')
        .get(getBootcampsInRadius)



module.exports = router
