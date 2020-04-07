
const ErrorResponse = require('../helpers/error');

const errorHandler = (err, req, res, next)=>{
  let error = {...err};

  error.message = err.message;
  console.log(err.stack.red);
  console.log(err.code)
    // Error with an impropper // ID
    if (err.name === 'CastError'){
      const message = `Resource not found with an improper id ${err.value}`;
      error = new ErrorResponse(message, 400);
    }
    // Mongo duplication error handler
    if(err.code === 11000){
      const message = `Resource already exist`
      error = new ErrorResponse(message, 400);
    }
  res.status(error.statusCode || 500).json({
    sucess: false,
    err: error.message || 'Server error'
  });
}

module.exports = errorHandler;
