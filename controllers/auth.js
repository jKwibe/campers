
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

    // Create token and send it in a cookie
    sendCookieWithToken(user, 201, res);
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


  // Create token and send it in a cookie
  sendCookieWithToken(user, 200, res);

});


// Get token from model also create cookie and send Response

const sendCookieWithToken = (user, statusCode, res) =>{
    const token = user.getSignedJwtToken();

    const options ={
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE_TIME * 24 * 60 *60 * 1000),
      httpOnly: true
    };

    res
      .status(statusCode)
      .cookie('token', token, options)
      .json({
        success: true,
        token
      });
}
