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
          $location.path('/api/users/login');
        }
        console.log(response);
        return $q.reject(response);
      };
      return interceptorFactory;
    }
  ])

  .factory('User', ['$http', function($http) {
    var userFactory = {};
    var id;
    userFactory.create = function(userData) {
      return $http.post('/api/users', userData);
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
    documentFactory.allDocuments = function() {
      return $http.get('/api/documents');
    };
    documentFactory.all = function() {
      return $http.get('/api/documents');
    };
    documentFactory.create = function(documentData) {
      return $http.post('/api/documents', documentData);
    };

    return documentFactory;
  }])

  .factory('socketio', ['$rootScope', function($rootScope) {
    var socket = io.connect();
    return {
      on: function(eventName, callback) {
        socket.on(eventName, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },
      emit: function(eventName, data, callback) {
        socket.emit(eventName, data, function() {
          var args = arguments;
          $rootScope.apply(function() {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  }]);
})();
