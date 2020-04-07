


const errorHandler = (err, req, res, next)=>{
  console.log(err.stack.red);
  res.status(err.statusCode || 500).json({
    sucess: false,
    err: err.message || 'Server error'
  });
}

module.exports = errorHandler;
