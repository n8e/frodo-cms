(function() {
  angular.module('frodocms.controllers')
    .controller('MainController', ['Auth', '$location',
      function(Auth, $location) {
        var self = this;
        var isOpen = false;
        self.isOpen = isOpen;
        self.toggleMenu = function() {
          if (isOpen) {
            classie.remove(document.body, 'show-menu');
          } else {
            classie.add(document.body, 'show-menu');
          }
          isOpen = !isOpen;
        };

        // logout function
        self.doLogout = function() {
          Auth.logout();
          self.user = '';
          $location.path('/logout');
        };

        self.message = 'Logout';
      }
    ]);
})();
