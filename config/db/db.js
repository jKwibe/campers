const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: '../config.env'})

const connectToDB = async ()=>{
    const connection = await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology:true
    });

    console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline.bold)
}

module.exports = connectToDB;
