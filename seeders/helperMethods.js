var Promise = require('bluebird'),
  Role = require('../server/models/roles');

var main = {
  exit: function() {
    setTimeout(function () {
      process.exit(0);
    }, 1000);
  },

  seedRole: function(role) {
    return new Promise(function (resolve, reject) {
      return role.save(function (err) {
        if (err) reject(err);
  
        resolve('Seeded role ' + role.title);
      });
    });
  },

  seedUser: function(userData) {
    return Role.findOne({ 'id': userData.role }, 'title', function (err, role) {
      if (err) return err;
  
      userData.role = role.title;
  
      return userData.save(function (err) {
        if (err) return err;
  
        return 'Seeded ' + userData.role + ' ' + userData.firstName;
      });
    });
  }
};

module.exports = main;