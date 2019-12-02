/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* Create your schema */
var dataSchema = new Schema({
  type: { type: String, required: true },
  link: String
}, {versionKey:false, collection: 'data', strict: false});

/* Use your schema to instantiate a Mongoose model */
var MongoData = mongoose.model('MongoData', dataSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = MongoData;
