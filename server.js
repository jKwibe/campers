// Root dependencies
const path = require('path');

// Bring in the modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Bring in the database
const connectDB = require('./config/db/db');

const errorHandler = require('./middleware/error');

const app = express();

dotenv.config({path: './config/config.env'})

const PORT = process.env.PORT;

connectDB()

if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// bodyParser
app.use(bodyParser.json());

// cookie-parser
app.use(cookieParser());


// Bring in the routes
const bootcampRoutes = require('./routes/bootcamps');
const coursesRoutes  = require('./routes/courses');
const authRoutes     = require('./routes/auth');

// adding the routes
app.use('/api/v1/bootcamps', bootcampRoutes);
app.use('/api/v1/courses', coursesRoutes);
app.use('/api/v1/auth', authRoutes);

// error handler execution
app.use(errorHandler);
app.listen(PORT, ()=>{
  console.log(`You are logged in ${process.env.NODE_ENV} mode in port ${PORT}`.yellow.bold.inverse);
})
