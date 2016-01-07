(function() {
  angular.module('frodocms', ['frodocms.services', 'frodocms.controllers', 
    'appRoutes', 'reverseDirective'])
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    });
})();
