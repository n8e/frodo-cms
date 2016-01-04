// require needed modules
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a schema
var RolesSchema = new Schema({
  id: {
    type: Number,
    unique:true
  },
  title: {
    type: String,
    enum: ['Administrator', 'User'],
    default: 'User',
    unique: true
  }

});

// make the model available to our users in our Node applications
module.exports = mongoose.model('Roles', RolesSchema);