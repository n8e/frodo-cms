// require the modules for database and password
var mongoose = require('mongoose'),
  Promise = require('bluebird'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  saltRounds = 10;

// create a schema
var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  name: {
    first: String,
    last: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password) {
  var user = this;

  return new Promise(function (resolve, reject) {

    return bcrypt.compare(password, user.password, function (err, res) {
      if (res) {
        resolve(res);
      }
      reject(err);
    });
  });
};

// make the model available to our users in our Node applications
module.exports = mongoose.model('User', UserSchema);
