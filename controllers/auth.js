
// The log in user functionality

const User = require('../models/Users');

const ErrorResponse = require('../helpers/error');
const asyncHandler = require('../middleware/async');

// @desc    Register User
// @desc    POST  /api/v1/auth/register
// @access  Public

exports.registerUser = asyncHandler(async (req, res, next)=>{
    const {name, email, password, role} = req.body;

    // create user
    const user = await User.create({
      name,
      email,
      password,
      role
    });

// Create token

  const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token
    });
});
