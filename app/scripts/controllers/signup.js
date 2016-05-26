(function() {
  angular.module('frodocms.controllers')
    .controller('SignupController', ['$rootScope', '$location',
      'User',
      function($rootScope, $location, User) {
        var self = this;

        // signing up a new user
        self.doSignup = function() {
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
          
          User.create(self.newUser, function(data) {
            self.processing = false;
            if (data.success) {
              $rootScope.currentUser = self.newUser;
              $location.path('/profile');
            } else {
              self.error = data.message;
            }
          });
        };
      }
    ]);
})();
