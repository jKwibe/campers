
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const CoursesSchema = new Schema({

   title: {
     type: String,
     trim: true,
     required: [true, 'You need a title for your courses'],
     minlength: [5, 'Title should have at least 5 characters'],
     maxlength: [40, 'Title should be atleast 40 characters']
   },
   description: {
     type: String,
     required: [true, 'Enter a description for your course'],
     maxlength: [500, 'The description should have at most 500 characters']
   },
   weeks: {
     type: Number,
     required: [true, 'Enter the duration of the course in weeks'],
     default: 0
   },
   tuition: {
     type: Number,
     required: [true, 'Enter the course tuition'],
     default: 0
   },
   minimumSkill: {
     type: String,
     required: [true, 'Enter the your level'],
     enum: [
       "beginner",
       "intermediate"
     ]
   },
   scholarhipsAvailable: {
     type: Boolean,
     default: true
   }
});

CoursesSchema.plugin(timestamps);


module.exports = mongoose.model("course", CoursesSchema);
