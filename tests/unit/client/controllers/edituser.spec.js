describe('Controller: EditUser Controller', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, $rootScope, $scope, Auth, User;
  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    controller = $controller('EditUserController');
    $rootScope = $injector.get('$rootScope');
    Auth = $injector.get('Auth');
    User = $injector.get('User');
    $scope = $rootScope.$new();
    spyOn(controller, 'updateUser').and.callThrough();
    controller.updateUser();
  }));

  describe('Initialization', function() {
    it('should verify that updateUser function is defined', function() {
      expect(controller.updateUser).toBeDefined();
      expect(controller.updateUser).toHaveBeenCalled();
    });
  });
});
