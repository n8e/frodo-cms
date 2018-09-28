(function () {
  angular.module('frodocms.services')
    .factory('User', ['$http', 'AuthToken', function ($http, AuthToken) {
      var userFactory = {};

      // to create a new user
      userFactory.create = function (userData, callback) {
        if (!userData.role) userData.role = 2;

        return $http.post('/api/users', userData)
          .then(function (data) {
            AuthToken.setToken(data.token);
            callback(data);
          }, function (err) {
            console.log('Error: Registration Failed!', err);
          });
      };

      // to update one user, logged in user
      userFactory.update = function (userId, userData, cb) {
        $http.put('/api/users/' + userId, userData)
          .then(function (data) {
            cb(data);
          }, function (err) {
            console.log('Error: Update Failed!');
          });
      };

      // to get all the users
      userFactory.all = function () {
        return $http.get('/api/users');
      };

      // to delete user
      userFactory.delete = function (userId, cb) {
        $http.delete('/api/users/' + userId)
          .then(function (data) {
            cb(data);
          }, function (err) {
            console.log('Error: Deletion Failed!');
          });
      };

      // return self
      return userFactory;
    }]);
})();
