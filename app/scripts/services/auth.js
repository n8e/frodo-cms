(function () {
  angular.module('frodocms.services')
    .factory('Auth', ['$http', '$q', 'AuthToken',
      function ($http, $q, AuthToken) {
        var authFactory = {};


        // user login service
        authFactory.login = function (credentials, callback) {
          return $http.post('/api/users/login', credentials)
            .then(function (response) {
              AuthToken.setToken(response.data.token);
              callback(response.data);
            }, function (err) {
              console.log('Error: Login Failed!');
              callback(err);
            });
        };

        // user logout service
        authFactory.logout = function () {
          AuthToken.setToken();
        };

        // service to check if user is logged in
        authFactory.isLoggedIn = function () {
          if (AuthToken.getToken()) {
            return true;
          } else {
            return false;
          }
        };

        // service to get the logged in user
        authFactory.getUser = function (cb) {
          if (AuthToken.getToken()) {
            return $http.get('/api/me')
              .then(function (data) {
                cb(null, data);
              }, function (err) {
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
