(function() {
  angular.module('frodocms.services', [])
    .factory('Auth', ['$http', '$q', 'AuthToken',
      function($http, $q, AuthToken) {
        var authFactory = {};

        // user login service
        authFactory.login = function(credentials, callback) {
          return $http.post('/api/users/login', credentials)
            .success(function(data) {
              AuthToken.setToken(data.token);
              callback(data);
            });
        };

        // user logout service
        authFactory.logout = function() {
          AuthToken.setToken();
        };

        // service to check if user is logged in
        authFactory.isLoggedIn = function() {
          if (AuthToken.getToken()) {
            return true;
          } else {
            return false;
          }
        };

        // service to get the logged in user
        authFactory.getUser = function(cb) {
          if (AuthToken.getToken()) {
            return $http.get('/api/me')
              .success(function(data) {
                cb(null, data);
              })
              .error(function(err) {
                cb(err, null);
              });
          } else {
            return $q.reject({
              message: 'User has no token'
            });
          }
        };

        // return self
        return authFactory;
      }
    ]);
})();
