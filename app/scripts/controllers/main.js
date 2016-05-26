(function() {
  angular.module('frodocms.controllers')
    .controller('MainController', ['Auth', '$location', '$rootScope',
      function(Auth, $location, $rootScope) {
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
          $rootScope.currentUser = {};
          $location.path('/logout');
        };

        self.message = 'Logout';
      }
    ]);
})();
