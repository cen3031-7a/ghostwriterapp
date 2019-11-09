/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  userid: { type: String, required: true },
  firstname: {type: String, required: true},
  password: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true},
  age: Number,
  accounttype: {type: String, required: true},
  timeline: [{
    sectionid: String,
    sectiontitle: String,
    sectionstartage: Number,
    sectionendage: Number,
    questions: [{
        questionid: String,
        response: String,
        _id: false
    }],
    _id: false
  }]
}, {versionKey:false});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
