(function() {
  angular.module('frodocms.services', [])
    .factory('User', ['$http', 'AuthToken', function($http, AuthToken) {
      var userFactory = {};

      // to create a new user
      userFactory.create = function(userData, callback) {
        return $http.post('/api/users', userData)
          .success(function(data) {
            AuthToken.setToken(data.token);
            callback(data);
          });
      };

      // to update one user, logged in user
      userFactory.update = function(userId, userData, cb) {
        $http.put('/api/users/' + userId, userData)
          .success(function(data) {
            cb(data);
          });
      };

      // to get all the users
      userFactory.all = function() {
        return $http.get('/api/users');
      };

      // to delete user
      userFactory.delete = function(userId, cb) {
        $http.delete('/api/users/' + userId)
          .success(function(data) {
            cb(data);
          })
          .error(function(err) {
            cb(err);
          });
      };

      // return self
      return userFactory;
    }]);
})();
