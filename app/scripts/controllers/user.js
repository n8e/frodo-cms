(function() {
  angular.module('frodocms.controllers', [])
    .controller('EditUserController', ['$rootScope', '$location', '$window',
      'Auth', 'User',
      function($rootScope, $location, $window, Auth, User) {
        var self = this;
        self.loggedIn = Auth.isLoggedIn();

        $rootScope.$on('$routeChangeStart', function() {
          self.loggedIn = Auth.isLoggedIn();
          Auth.getUser(function(err, data) {
            self.user = data;
          });
        });

        // to update the current user
        self.updateUser = function(id) {
          self.processing = true;

          Auth.getUser(function(err, data) {
            self.user = data;
            self.updatedUser = {
              username: self.user.username,
              password: self.user.password,
              firstname: self.userData.firstname || self.user.name.first,
              lastname: self.userData.lastname || self.user.name.last,
              email: self.userData.email || self.user.email,
              role: self.user.role
            };

            User.update(id, self.updatedUser, function(data) {
              self.processing = false;
              if (data.success) {
                self.user = data.user;
                $window.location.reload();
              } else {
                self.error = data.message;
              }
            });
          });
        };

        // to delete the current user
        self.delete = function(id) {
          self.processing = true;

          User.delete(id, function(data) {
            self.processing = false;
            if (data.message._id) {
              // clear user
              self.user = {};
              self.userData = {};
              $location.path('/signup');
            } else {
              self.error = data.message;
            }
          });
        };
      }
    ]);
})();
