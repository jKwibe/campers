// Root dependencies
const path = require('path');

// Bring in the modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

dotenv.config({path: './config/config.env'})

const PORT = process.env.PORT;


if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}


// Bring in the routes
const bootcampRoutes = require('./routes/bootcamps');

// adding the routes
app.use('/api/v1/bootcamps', bootcampRoutes)


app.listen(PORT, ()=>{
  console.log(`You are logged in ${process.env.NODE_ENV} mode in port ${PORT}`);
})
