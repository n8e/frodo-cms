(function() {
  angular.module('frodocms.services', [])
    .factory('Auth', ['$http', '$q', 'AuthToken',
      function($http, $q, AuthToken) {
        var authFactory = {};
        authFactory.login = function(credentials, callback) {
          return $http.post('/api/users/login', credentials)
            .success(function(data) {
              AuthToken.setToken(data.token);
              callback(data);
            });
        };
        authFactory.logout = function() {
          AuthToken.setToken();
        };
        authFactory.isLoggedIn = function() {
          if (AuthToken.getToken()) {
            return true;
          } else {
            return false;
          }
        };
        authFactory.getUser = function() {
          if (AuthToken.getToken()) {
            return $http.get('/api/me');
          } else {
            return $q.reject({
              message: 'User has no token'
            });
          }
        };
        return authFactory;
      }
    ])

  .factory('AuthToken', ['$window', function($window) {
    var authTokenFactory = {};
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    };
    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    };
    return authTokenFactory;
  }])

  .factory('AuthInterceptor', ['$q', '$location',
    'AuthToken',
    function($q, $location, AuthToken) {
      var interceptorFactory = {};
      interceptorFactory.request = function(config) {
        var token = AuthToken.getToken();
        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      };
      interceptorFactory.responseError = function(response) {
        if (response.status == 403) {
          $location.path('/login');
        }
        return response;
      };
      return interceptorFactory;
    }
  ])

  .factory('User', ['$http', 'AuthToken', function($http, AuthToken) {
    var userFactory = {};
    var id;
    userFactory.create = function(userData, callback) {
      return $http.post('/api/users', userData)
        .success(function(data) {
          AuthToken.setToken(data.token);
          callback(data);
        });
    };
    userFactory.update = function(userData) {
      return $http.get('/api/me')
        .success(function(data) {
          id = data._id;
          $http.put('/api/users/' + id, userData);
        });
    };
    userFactory.all = function() {
      return $http.get('/api/users');
    };
    return userFactory;
  }])

  .factory('Document', ['$http', function($http) {
    var documentFactory = {};
    var id;
    documentFactory.allDocuments = function() {
      return $http.get('/api/documents');
    };
    documentFactory.all = function(callback) {
      $http.get('/api/me')
        .success(function(data) {
          id = data._id;
          return $http.get('/api/users/' + id + '/documents')
            .success(function(data) {
              callback(data);
            });
        });
    };
    documentFactory.create = function(documentData, callback) {
      return $http.post('/api/documents', documentData)
        .success(function(data) {
          callback(data);
        });
    };
    return documentFactory;
  }]);
})();
