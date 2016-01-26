(function() {
  angular.module('frodocms', [
      'appRoutes',
      'frodocms.services',
      'frodocms.controllers',
      'reverseDirective'
    ])
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    });
})();
