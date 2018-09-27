(function () {
  angular.module('frodocms.controllers')
    .controller('MainController', ['Auth', 'User', '$location', '$rootScope',
      function (Auth, User, $location, $rootScope) {
        var self = this;
        var isOpen = false;
        self.isOpen = isOpen;

        self.toggleMenu = function () {
          if (isOpen) {
            classie.remove(document.body, 'show-menu');
          } else {
            classie.add(document.body, 'show-menu');
          }
          isOpen = !isOpen;
        };

        // signing up a new user
        self.doSignup = function () {
          self.processing = true;
          self.error = '';

          // object to store new user
          self.newUser = {
            username: self.signupData.username,
            password: self.signupData.password,
            firstname: self.signupData.firstname,
            lastname: self.signupData.lastname,
            email: self.signupData.email,
            role: self.signupData.role
          };

          User.create(self.newUser, function (data) {
            self.processing = false;
            if (data.success) {
              $rootScope.currentUser = self.newUser;
              $location.path('/profile');
            } else {
              self.error = data.message;
            }
          });
        };

        // login function
        self.doLogin = function () {
          self.processing = true;
          self.error = '';

          self.loggedIn = Auth.isLoggedIn();

          $rootScope.$on('$routeChangeStart', function () {
            self.loggedIn = Auth.isLoggedIn();
            Auth.getUser(function (err, data) {
              self.user = data;
            });
          });

          Auth.login(self.loginData, function (data) {
            self.processing = false;
            Auth.getUser(function (err, data) {
              self.user = data;
              $rootScope.currentUser = data;
            });
            if (data.success) {
              $location.path('/profile');
            } else {
              self.error = data.message;
            }
          });
        };

        // logout function
        self.doLogout = function () {
          Auth.logout();
          self.user = '';
          $rootScope.currentUser = '';
          $location.path('/logout');
        };

        self.message = 'Logout';
      }
    ]);
})();
