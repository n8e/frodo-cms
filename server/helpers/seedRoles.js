require('dotenv').load();

var env = 'development',
  mongoose = require('mongoose'),
  Promise = require('bluebird'),
  Role = require('../models/roles'),
  config = require('../config')[env];

// roles
var roleData = {
  roleAdmin: new Role({
    id: 1,
    title: 'Administrator'
  }),
  roleUser: new Role({
    id: 2,
    title: 'User'
  })
};

function seedRole(role) {
  return new Promise(function (resolve, reject) {
    return role.save(function (err) {
      if (err) {
        reject(err);
      }

      resolve('Seeded role ' + role.title);
    });
  });
}

mongoose.Promise = global.Promise;

function connectAndSeedRoles() {
  return new Promise(function (resolve, reject) {
    return mongoose.connect(config.database[env], { keepAlive: true, keepAliveInitialDelay: 300000 }, function (err) {
      if (err) {
        reject(err);
      }

      return mongoose.connection.db.dropCollection('roles', function (err) {
        if (err) {
          reject(err);
        }

        console.log('Connected to DB -', config.database[env]);
        var loadFirstRole = seedRole(roleData.roleAdmin);
        return loadFirstRole
          .then(function () {
            console.log('Loaded Role -', roleData.roleAdmin.title);
            var loadSecondRole = seedRole(roleData.roleUser);

            return loadSecondRole
              .then(function (resp) {
                console.log('Loaded Role -', roleData.roleUser.title);
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

(function seeder() {
  return connectAndSeedRoles().then(function () {
    return process.exit(0);
  });
})();
