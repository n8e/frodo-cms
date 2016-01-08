describe('Controller: Login Controller', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, $rootScope, $scope, Auth;
  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    controller = $controller('LoginController');
    $rootScope = $injector.get('$rootScope');
    Auth = $injector.get('Auth');
    $scope = $rootScope.$new();
  }));

  describe('Initialization', function() {
    it('should verify that doLogin function is defined', function() {
      expect(controller.doLogin).toBeDefined();
    });
    it('should verify that doLogout function is defined', function() {
      expect(controller.doLogout).toBeDefined();
    });
    it('should verify that loggedIn function is defined', function() {
      expect(controller.loggedIn).toBeDefined();
    });
  });
});
