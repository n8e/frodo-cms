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
    ])

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

    // to create a new user
    userFactory.create = function(userData, callback) {
      return $http.post('/api/users', userData)
        .success(function(data) {
          AuthToken.setToken(data.token);
          callback(data);
        });
    };

    // to update one user, logged in user
    userFactory.update = function(userData) {
      return $http.get('/api/me')
        .success(function(data) {
          id = data._id;
          $http.put('/api/users/' + id, userData);
        });
    };

    // to get all the users
    userFactory.all = function() {
      return $http.get('/api/users');
    };

    // to delete user
    userFactory.delete = function(cb) {
      $http.get('/api/me')
        .success(function(data) {
          id = data._id;
          $http.delete('/api/users/' + id)
            .success(function(data) {
              console.log('HERE' + JSON.stringify(data));
              cb(null, data);
            })
            .error(function(err) {
              cb(err, null);
            });
        });
    };

    // return self
    return userFactory;
  }])

  .factory('Document', ['$http', function($http) {
    var documentFactory = {};
    var id;

    // all documents indiscriminately
    documentFactory.allDocuments = function() {
      return $http.get('/api/documents');
    };

    // all documents for a specific user
    documentFactory.all = function(cb) {
      $http.get('/api/me')
        .success(function(data) {
          id = data._id;
          $http.get('/api/users/' + id + '/documents')
            .success(function(data) {
              cb(null, data);
            })
            .error(function(err) {
              cb(err, null);
            });
        });
    };

    // create a new document
    documentFactory.create = function(documentData, callback) {
      return $http.post('/api/documents', documentData)
        .success(function(data) {
          callback(data);
        });
    };

    // to delete user
    documentFactory.delete = function(docId, cb) {
      $http.delete('/api/documents/' + docId)
        .success(function(data) {
          console.log('HERE' + JSON.stringify(data));
          cb(data);
        })
        .error(function(err) {
          cb(err);
        });
    };

    // return self
    return documentFactory;
  }]);
})();
