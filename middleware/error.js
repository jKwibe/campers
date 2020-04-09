// const colors = require('colors');
const ErrorResponse = require('../helpers/error');

const errorHandler = (err, req, res, next)=>{
  let error = {...err};

  error.message = err.message;
  console.log(err);
  console.log(err.code)
    // Error with an impropper // ID
    if (err.name === 'CastError'){
      const message = `Resource not found with a non-existing id => id: ${err.value}`;
      error = new ErrorResponse(message, 404);
    }
    // Mongo duplication error handler
    if(err.code === 11000){
      const message = `Resource already exist`
      error = new ErrorResponse(message, 400);
    }

    // For database validation errors
    if(err.name === 'ValidationError'){
      const message = Object.values(err.errors).map(val => val.message);
      error = new ErrorResponse(message, 400);
    }


  res.status(error.statusCode || 500).json({
    sucess: false,
    err: error.message || 'Server error'
  });
}

module.exports = errorHandler;
