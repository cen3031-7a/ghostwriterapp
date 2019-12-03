/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    uuidv4 = require('uuidv4'),
    bcrypt = require('bcryptjs')
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

userSchema.pre('save', next => {
  // hash password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(User.password, salt, (err, hash) => {
      if (err) throw err;
      User.password = hash;
    })
  })
  next();
})
/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;
