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
    controller.user = {
      username: 'smalik',
      password: '12345',
      firstname: 'Sadiq',
      lastname: 'Malika',
      email: 'smalik@gmail.com',
      role: 2
    };
    controller.userData = {
      firstname: 'Sandra',
      lastname: 'Malika',
      email: 'smalika@gmail.com' 
    };
    spyOn($scope, '$on').and.callThrough();
    spyOn(controller, 'updateUser').and.callThrough();
    controller.updateUser();
    $scope.$on();
  }));

  describe('Initialization', function() {
    it('should verify that updateUser function is defined', function() {
      expect(controller.updateUser).toBeDefined();
      expect(controller.updateUser).toHaveBeenCalled();
      expect($scope.$on).toBeDefined();
      expect($scope.$on).toHaveBeenCalled();
    });
  });
});
