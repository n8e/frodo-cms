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

function seeder(callback) {
  mongoose.connect(config.database, function (err) {
    if (err) return err;

    console.log('Tests connected to the database.');
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) return err;

      console.log('Dropped database before seeding');

      var loadFirstRole = helpers.seedRole(data.roleAdmin);

      return loadFirstRole
        .then(function () {
          var loadSecondRole = helpers.seedRole(data.roleUser);

          return loadSecondRole
            .then(function (resp) {
              return callback();
            });
        });
    });

    helpers.exit();
  });
}

seeder(function () {
  helpers.seedUser(data.user1);
  helpers.seedUser(data.user2);
  helpers.seedUser(data.admin);
});
