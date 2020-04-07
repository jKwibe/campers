
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const BootcampSchema = new Schema({
   name: String,
   email: String
});
BootcampSchema.plugin(timestamps);

module.exports = mongoose.model("bootcamp", BootcampSchema);
