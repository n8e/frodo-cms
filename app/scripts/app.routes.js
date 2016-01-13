(function() {
  angular.module('appRoutes', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'index.html'
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
        .when('/myDocuments', {
          templateUrl: 'views/user/view_my_documents.html',
          controller: 'AllDocumentsController',
          controllerAs: 'document',
          resolve: {
            documents: function(Document) {
              return Document.allDocuments();
            }
          }
        });
      $locationProvider.html5Mode(true);
    })
    .run(function($rootScope, $location) {
      $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.showSection = $location.path() !== '/';
      });
    });
})();
