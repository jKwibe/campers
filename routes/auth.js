


const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/auth');

router.route('/')
      .get()
      .post(registerUser)


module.exports = router;
