(function() {
  angular.module('frodocms.controllers', [])
    .controller('MainController', function() {
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
    });
})();
