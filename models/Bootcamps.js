
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const geocoder = require('../helpers/geocoder');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const BootcampSchema = new Schema({
   name: {
      type: String,
      required: [true, 'Name field is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'The name not more than 50 characters']
   },
   phoneNo: {
      type: String,
      required: [true, 'Phone number field is needed'],
      unique: true,
      trim: true,
      maxlength: [20, 'The name not more than 20 characters']
   },
   slug: String,
   description: {
      type: String,
      required: true,
      maxlength: [500, 'The description not more than 500 characters']
   },

   website:{
      type: String,
      required: [true, 'Website field is required'],
      match: [
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/,
      'Enter a valid URL for the bootcamp'
      ]
   },

   email:{
      type: String,
      required: [true, 'Website field is required'],
      match: [
         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         'Enter a valid email for the bootcamp'
      ]
   },
   // Geojson location
   location: {
   type: {
     type: String, // Don't do `{ location: { type: String } }`
     enum: ['Point'], // 'location.type' must be 'Point'
     // required: true
   },
   coordinates: {
     type: [Number],
     // required: true,
     index: '2dsphere',
   },
    formattedAddress: String,
    city: String,
    state: String,
    zip: String
 },

   address: {
     type: String,
     required: [true , 'Please add a valid address']
   },

   careers:{
     type: [String],
     required: true,
     enum:[
       'Backend Development',
       'Frontend Development',
       'Data Science',
       'Others'
     ]
   },

   averagerating: {
     type: Number,
     min: [1, 'Rating must be at least 1'],
     max: [10, 'Rating must be at most 10']
   },
   housing: {
     type: Boolean,
     default: false
   },
   jobAssistance:{
     type: Boolean,
     default: true
   },
   jobGuarantee: {
     type: Boolean,
     default: false
   },
   acceptGi: {
     type: Boolean,
     default: true
   }
},
{
  toJSON: { virtuals: true},
  toObject: { virtuals: true}
});
BootcampSchema.plugin(timestamps);

// Create bootcamp slug from Name
BootcampSchema.pre('save', function(next){
  this.slug = slugify(this.name, {lower: true});
  next();
});

// Geocoder schema middleware

BootcampSchema.pre('save', async function(next){
  const loc = await geocoder.geocode(this.address);
  // console.log(loc);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    state: loc[0].stateCode,
    zip: loc[0].zipcode,
  }

  //Do not save the address entered by the user
  this.address = undefined;
  next();
})

// Reverse populate with virtuals
BootcampSchema.virtual('courses', {
  ref: 'course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false
});

// Cascade the delete functionality
// deleting a bootcamp deletes the assoisiated courses too

BootcampSchema.pre('remove' , async function(next){
  // console.log(`Courses being removed frombootcamp ${this._id}`);
  await this.model('course').deleteMany({bootcamp: this._id});
  next();
})

module.exports = mongoose.model("bootcamp", BootcampSchema);
