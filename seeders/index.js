var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  require('dotenv').load();
}

var mongoose = require('mongoose'),
  Promise = require('bluebird'),
  Role = require('../server/models/roles'),
  config = require('../server/config')[env],
  data = require('./data'),
  helpers = require('./helperMethods');

mongoose.Promise = Promise;

function connectAndSeedRoles() {
  return new Promise(function (resolve, reject) {
    return mongoose.connect(config.testDB, function (err) {
      if (err) {
        reject(err);
      }

      return mongoose.connection.db.dropDatabase(function (err) {
        if (err) {
          reject(err);
        }
        console.log('Connected to Test DB and dropped database');

        var loadFirstRole = helpers.seedRole(data.roleAdmin);
        return loadFirstRole
          .then(function () {
            var loadSecondRole = helpers.seedRole(data.roleUser);

            return loadSecondRole
              .then(function (resp) {
                resolve(resp);
              })
              .catch(function (err) {
                reject(err);
              });
          })
          .catch(function (err) {
            reject(err);
          });
      });
    });
  });
}

function seeder(callback) {
  return connectAndSeedRoles()
    .then(function () {
      return callback().then(function () {
        return helpers.exit();
      });
    });

}

seeder(function () {
  return new Promise(function (resolve, reject) {
    var loadFirstUser = helpers.seedUser(data.user1);

    return loadFirstUser
      .then(function (resp) {
        console.log('LOADED ONE USER!', resp);
        var loadSecondUser = helpers.seedUser(data.user2);

        return loadSecondUser
          .then(function (resp) {
            console.log('LOADED TWO USERS!', resp);
            var loadThirdUser = helpers.seedUser(data.admin);

            return loadThirdUser
              .then(function (resp) {
                resolve('LOADED ALL THREE USERS!', resp);
              })
              .then()
              .catch(function (err) {
                reject(err);
              });
          })
          .catch(function (err) {
            reject(err);
          });
      })
      .catch(function (err) {
        reject(err);
      });
  });
});
