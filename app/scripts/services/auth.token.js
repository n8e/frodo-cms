(function() {
  angular.module('frodocms.services')
    .factory('AuthToken', ['$window', function($window) {
      var authTokenFactory = {};

      // get the token fro  the window
      authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
      };

      // set the token in the window storage
      authTokenFactory.setToken = function(token) {
        if (token) {
          $window.localStorage.setItem('token', token);
        } else {
          $window.localStorage.removeItem('token');
        }
      };

      // return self
      return authTokenFactory;
    }]);
})();
