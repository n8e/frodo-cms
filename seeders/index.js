var User = require('../server/models/users'),
  Role = require('../server/models/roles'),
  mongoose = require('mongoose'),
  config = require('../server/config/config');
var user = new User({
  firstname: 'Sadiq',
  lastname: 'Malika',
  password: '12345',
  email: 'smalik@gmail.com',
  username: 'smalik',
  role: 2
});
var secUser = new User({
  firstname: 'Thomas',
  lastname: 'Nyambati',
  password: '12345',
  email: 'tnyambati@gmail.com',
  username: 'tn',
  role: 2
});
var admin = new User({
  username: 'Sonnie',
  password: '12345',
  firstname: 'Sonia',
  lastname: 'Granger',
  email: 'sgranger@gmail.com',
  role: 1
});
var roleAdmin = new Role({
  id: 1,
  title: 'Administrator'
});
var roleUser = new Role({
  id: 2,
  title: 'User'
});

function exit() {
  setTimeout(function() {
    process.exit(0);
  }, 1000);
}

function rolesAdminSeed() {
  roleAdmin.save(function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Seeded role Administrator');
  });
}
// seed role 2 for User
function rolesUserSeed() {
  roleUser.save(function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Seeded role User');
  });
}
// seed sample user
function userOneSeed() {
  // find a role based on the input on the body
  Role.find({
    id: user.role
  }, function(err, roles) {
    if (err) {
      res.send(err);
    }
    // add the role to the user before being saved
    user.role = roles[0].title;
    // save the user object
    user.save(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Seeded user Malika');
    });
  });
}
// seed sample second user
function userTwoSeed() {
  // find a role based on the input on the body
  Role.find({
    id: secUser.role
  }, function(err, roles) {
    if (err) {
      res.send(err);
    }
    // add the role to the user before being saved
    secUser.role = roles[0].title;
    // save the user object
    secUser.save(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Seeded user Thomas');
    });
  });
}
// seed sample admin
function adminSeed() {
  // find a role based on the input on the body
  Role.find({
    id: admin.role
  }, function(err, roles) {
    if (err) {
      res.send(err);
    }
    // add the role to the user before being saved
    admin.role = roles[0].title;
    // save the user object
    admin.save(function(err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Seeded admin Sonnie');
    });
  });
}

function seeder(callback) {
  mongoose.connect(config.database, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Tests connected to the database.');
      mongoose.connection.db.dropDatabase(function(err) {
        if (err) {
          return err;
        } else {
          console.log('Dropped database before seeding');
          rolesAdminSeed();
          rolesUserSeed();
          callback();
        }
      });
      exit();
    }
  });
}
seeder(function() {
    userOneSeed();
    userTwoSeed();
    adminSeed();
  }
);
