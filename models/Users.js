
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

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

 module.exports = mongoose.model('user', UserSchema);
