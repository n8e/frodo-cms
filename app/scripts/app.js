(function() {
  angular.module('frodocms', [
      'appRoutes',
      'frodocms.services',
      'frodocms.controllers',
      'reverseDirective'
    ])
    .config(['$httpProvider', function($httpProvider) {
      var token = window.localStorage.getItem('token');
      if (token) {
        $httpProvider.defaults.headers.common['x-access-token'] = token;
      }
    }]);
})();
