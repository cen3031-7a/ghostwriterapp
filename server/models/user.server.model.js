/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    bcyrpt = require('bcryptjs'),
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  userid: { type: String, required: true },
  firstname: String,
  lastname: String,
  email: String,
  age: Number,
  password: String,
  accounttype: String,
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

/* Use your schema to instantiate a Mongoose model */
var User = mongoose.model('User', userSchema);

userSchema.pre('save', (next) => {
  if(!this.password){
    //no password
    next();
  }
  //make sure the password saved is hashed
  this.password = this.hashPasword(this.password);
  next();
});

exports.checkPassword = (password) => {
  return bcyrpt.compareSync(password, this.password);
}

exports.hashPasword = (plain_password) => {
  return bcyrpt.hashSync(plain_password, 10);
}

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
