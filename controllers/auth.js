
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


// @desc    login User
// @desc    POST  /api/v1/auth/login
// @access  Public

exports.loginUser = asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body;

    // Validation
    if(!email || !password){
      return next(new ErrorResponse(`Please provide an email and a password`, 400 ));
    }
    // check for the user
    const user = await User.findOne({email: email}).select('+password');

    if(!user){
      return next(new ErrorResponse(`Invalid email or password`, 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
      return next(new ErrorResponse(`Invalid email or password`, 401));
    }


// Create token
  const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token
    });
});
