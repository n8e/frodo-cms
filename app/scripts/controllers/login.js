(function() {
  angular.module('frodocms.controllers')
    .controller('LoginController', ['$rootScope', '$location',
      'Auth',
      function($rootScope, $location, Auth) {
        var self = this;
        self.loggedIn = Auth.isLoggedIn();

        $rootScope.$on('$routeChangeStart', function() {
          self.loggedIn = Auth.isLoggedIn();
          Auth.getUser(function(err, data) {
            self.user = data;
          });
        });

        // login function
        self.doLogin = function() {
          self.processing = true;
          self.error = '';
          Auth.login(self.loginData, function(data) {
            self.processing = false;
            Auth.getUser(function(err, data) {
              self.user = data;
              console.log('DATA getUser ' + JSON.stringify(data));
              console.log('ERR' + JSON.stringify(err));
            });
            if (data.success) {
              $location.path('/profile');
            } else {
              self.error = data.message;
            }
          });
        };

        // logout function
        self.doLogout = function() {
          Auth.logout();
          self.user = '';
          $location.path('/logout');
        };
      }
    ]);
})();
