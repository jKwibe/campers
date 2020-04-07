// Root dependencies
const path = require('path');

// Bring in the modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const bodyParser = require('body-parser');

// Bring in the database
const connectDB = require('./config/db/db');

const app = express();

dotenv.config({path: './config/config.env'})

const PORT = process.env.PORT;

connectDB()

if (process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// bodyParser
app.use(bodyParser.json())


// Bring in the routes
const bootcampRoutes = require('./routes/bootcamps');

// adding the routes
app.use('/api/v1/bootcamps', bootcampRoutes)


app.listen(PORT, ()=>{
  console.log(`You are logged in ${process.env.NODE_ENV} mode in port ${PORT}`);
})
