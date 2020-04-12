


const express = require('express');
const router = express.Router();

const {registerUser, loginUser} = require('../controllers/auth');

router.route('/register')
      .get()
      .post(registerUser);

router.route('/login')
      .get()
      .post(loginUser)


module.exports = router;
