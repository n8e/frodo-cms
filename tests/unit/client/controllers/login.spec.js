describe('Controller: LoginController', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, $rootScope, $scope, Auth;

  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    controller = $controller('LoginController');
    $rootScope = $injector.get('$rootScope');
    Auth = $injector.get('Auth');
    $scope = $rootScope.$new();
    controller.loginData = {
      username: 'smalik',
      password: '12345'
    };
    spyOn($scope, '$on').and.callThrough();
    spyOn(controller, 'doLogin').and.callThrough();
    spyOn(controller, 'doLogout').and.callThrough();
    controller.doLogin();
    controller.doLogout();
    $scope.$on();
  }));
  
  describe('$routeChangeSuccess', function() {
    it('should verify that the function runs', function() {
      expect($scope.$on).toBeDefined();
      expect($scope.$on).toHaveBeenCalled();
    });
  });

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
