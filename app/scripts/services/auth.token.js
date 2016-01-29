(function() {
  angular.module('frodocms.services')
    .factory('AuthToken', ['$window', '$http', function($window, $http) {
      var authTokenFactory = {};

      // get the token fro  the window
      authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
      };

      // set the token in the window storage
      authTokenFactory.setToken = function(token) {
        if (token) {
          $http.defaults.headers.common['x-access-token'] = token;
          $window.localStorage.setItem('token', token);
        } else {
          delete $http.defaults.headers.common['x-access-token'];
          $window.localStorage.removeItem('token');
        }
      };

      // return self
      return authTokenFactory;
    }]);
})();
