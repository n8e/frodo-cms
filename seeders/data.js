var User = require('../server/models/users'),
  Role = require('../server/models/roles');

var user1 = new User({
  firstname: 'Sadiq',
  lastname: 'Malika',
  password: '12345',
  email: 'smalik@gmail.com',
  username: 'smalik',
  role: 2
});

var user2 = new User({
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

module.exports = {
  user1: user1,
  user2: user2,
  admin: admin,
  roleAdmin: roleAdmin,
  roleUser: roleUser
};