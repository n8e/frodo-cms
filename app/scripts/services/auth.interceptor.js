(function() {
  angular.module('frodocms.services')
    .factory('AuthInterceptor', ['$q', '$location',
      'AuthToken',
      function($q, $location, AuthToken) {
        var interceptorFactory = {};

        // to set the header
        interceptorFactory.request = function(config) {
          var token = AuthToken.getToken();
          if (token) {
            config.headers['x-access-token'] = token;
          }
          return config;
        };
        
        // return error
        interceptorFactory.responseError = function(response) {
          if (response.status == 403) {
            $location.path('/login');
          }
          return response;
        };
        return interceptorFactory;
      }
    ]);
})();
