/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var sectionSchema = new Schema({
  sectionid: String,
  sectionname: String,
  questions: [{
    questionid: String,
    question: String,
    isDeleted: Boolean,
    tips: [String],
    _id: false
  }],
  isDeleted: Boolean
}, {versionKey:false});

/* Use your schema to instantiate a Mongoose model */
var Section = mongoose.model('Section', sectionSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Section;
