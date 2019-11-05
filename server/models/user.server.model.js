/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  userid: { type: String, required: true },
  firstname: String,
  lastname: String,
  email: String,
  age: Number,
  accounttype: Number,
  timeline: [{
    sectionid: String,
    sectiontitle: String,
    sectionstartage: Number,
    sectionendage: Number,
    questions: [{
        questionid: String,
        response: String
    }]
  }]
});

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
