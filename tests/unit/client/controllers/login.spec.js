describe('Controller: LoginController', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, $rootScope, $scope, Auth;
  var username = 'smalik', password = '12345';
  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    controller = $controller('LoginController');
    $rootScope = $injector.get('$rootScope');
    Auth = $injector.get('Auth');
    $scope = $rootScope.$new();
    spyOn(controller, 'doLogin').and.callThrough();
    spyOn(controller, 'doLogout').and.callThrough();
    controller.doLogin(username, password);
    controller.doLogout();
  }));

  describe('Initialization', function() {
    it('should verify that doLogin function is defined', function() {
      expect(controller.doLogin).toBeDefined();
      expect(controller.doLogin).toHaveBeenCalled();
    });
    it('should verify that doLogout function is defined', function() {
      expect(controller.doLogout).toBeDefined();
      expect(controller.doLogout).toHaveBeenCalled();
    });
  });
});
