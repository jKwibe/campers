

const express = require('express');

const router = express.Router();

// importing the controllers

const { getBootCamps,
        createBootCamps, 
        getSingleBootcamp,
        deleteBootcamp,
        updateBootcamp
    } = require('../controllers/bootcamps');

 router.route('/')
       .get(getBootCamps)
       .post(createBootCamps);

 router.route('/:id')
        .get(getSingleBootcamp)
        .delete(deleteBootcamp)
        .put(updateBootcamp)



module.exports = router
