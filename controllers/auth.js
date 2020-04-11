
// The log in user functionality

const User = require('../models/Users');

const ErrorResponse = require('../helpers/error');
const asyncHandler = require('../middleware/async');



exports.registerUser = asyncHandler(async (req, res, next)=>{

    res.status(201).json({
      success: true
    });
});
