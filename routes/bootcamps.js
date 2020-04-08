

const express = require('express');

const router = express.Router();

// importing the controllers

const { getBootCamps,
        createBootCamps,
        getSingleBootcamp,
        deleteBootcamp,
        updateBootcamp,
        getBootcampsInRadius
    } = require('../controllers/bootcamps');

 router.route('/')
       .get(getBootCamps)
       .post(createBootCamps);

 router.route('/:id')
        .get(getSingleBootcamp)
        .delete(deleteBootcamp)
        .put(updateBootcamp)

 router.route('/radius/:zipcode/:distance')
        .get(getBootcampsInRadius)



module.exports = router
