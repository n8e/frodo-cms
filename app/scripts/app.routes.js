(function() {
  angular.module('appRoutes', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/login.html',
            controller: 'MainController',
            controllerAs: 'main'
          })
          .when('/signup', {
            templateUrl: 'views/signup.html'
          })
          .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            controllerAs: 'login'
          })
          .when('/document', {
            templateUrl: 'views/user/document.html'
          })
          .when('/logout', {
            templateUrl: 'views/logout.html'
          })
          .when('/profile', {
            templateUrl: 'views/user/profile.html'
          })
          .when('/error', {
            templateUrl: 'views/error.html'
          })
          .when('/allDocuments', {
            templateUrl: 'views/user/all_documents.html',
            controller: 'AllDocumentsController',
            controllerAs: 'document',
            resolve: {
              documents: function(Document) {
                return Document.allDocuments(function(err, data) {
                  return { error: err, date: data };
                });
              }
            }
          })
          .when('/myDocuments', {
            templateUrl: 'views/user/view_my_documents.html',
            controller: 'AllDocumentsController',
            controllerAs: 'document',
            resolve: {
              documents: function(Document) {
                return Document.all(function(err, data) {
                  return { error: err, date: data };
                });
              }
            }
          })
          .otherwise({
            redirectTo: '/'
          });
        $locationProvider.html5Mode(true);
      }
    ])
    .run(function($rootScope, $location) {
      $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.showSection = $location.$$path !== '/';
      });
    });
})();
