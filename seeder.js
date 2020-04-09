 const fs = require('fs');

 const mongoose = require('mongoose');
 const colors = require('colors');
 const dotenv = require('dotenv');

 dotenv.config({path: './config/config.env'});

 //loadmodals
const Bootcamp = require('./models/Bootcamps');
const Course = require('./models/Courses');

//connect to // DEBUG:
mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
});

// read JSON file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));
const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'));

// import in to db
const importData = async ()=>{
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log("data imported".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

//delete database

const deleteData = async ()=>{
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log("data destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

if(process.argv[2] === '-i'){
  importData();
}else if(process.argv[2] === '-d'){
  deleteData();
}
