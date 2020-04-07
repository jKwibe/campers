

const express = require('express');

const router = express.Router();

// importing the controllers

const {getBootCamps, createBootCamps} = require('../controllers/bootcamps');

 router.route('/')
       .get(getBootCamps)
       .post(createBootCamps)



module.exports = router
