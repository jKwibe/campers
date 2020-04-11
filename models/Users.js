
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcryptjs');
const jswt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({path: '../config/config.env'});

const UserSchema = mongoose.Schema({
  name:{
    type: String,
    require: [true, 'User name required'],
    minlength: [5, 'Username should be at least 5 characters'],
    maxlength: [20, 'Usernameshould not exceed 20 characters'],
    trim: true,
    unique: true
  },
  email:{
    type: String,
    required: [true, 'Enter an email please'],
    match:[
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Enter a valid email'
    ],
    unique: true
    },
    role:{
      type: String,
      required: true,
      enum:[
        'user',
        'admin'
      ],
      default: 'user'
    },
    password: {
      type: String,
      required: [true, 'Enter a password'],
      minlength: [6, 'Password should be more than 6 characters'],
      select: false
    }
});

UserSchema.plugin(timestamps);

  //encrypt password using bcrypt
  UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
  });

  // Sign jwt and return
  UserSchema.methods.getSignedJwtToken = function(){
    console.log(typeof process.env.JWT_SECRET);
    return jswt.sign({id: this._id}, process.env.JWT_SECRET, {
      expiresIn : process.env.JWT_EXPIRE_TIME
    });
  };


 module.exports = mongoose.model('user', UserSchema);
