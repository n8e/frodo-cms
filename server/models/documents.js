// require needed modules
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
var DocumentSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    unique: true
  },
  content: {
    type: String,
    unique: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  lastModified: {
    type: Date,
    default: Date.now()
  }
});

// make the model available to our users in our Node applications
module.exports = mongoose.model('Document', DocumentSchema);