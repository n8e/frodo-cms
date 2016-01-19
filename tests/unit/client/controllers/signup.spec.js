describe('Controller: Signup Controller', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, $rootScope, $location, User;

  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    User = $injector.get('User');
    // instantiate controller
    controller = $controller('SignupController');
    // signup data
    controller.signupData = {
      username: 'knights',
      password: '12345',
      firstname: 'Eugene',
      lastname: 'Mutai',
      email: 'eugene.mutai@andela.com ',
      role: 2
    };
  }));

  describe('Initialization', function() {
    it('doSignup should be a function and should call User.create', function() {
      User.create = sinon.spy();
      controller.doSignup();
      expect(typeof controller.doSignup).toBe('function');
      expect(User.create.called).toBe(true);
      expect(controller.processing).toBeDefined();
      expect(controller.processing).toBe(true);
      $location.path = sinon.stub();
      User.create.args[0][1]({
          success: true,
          message: 'message'
      });
      expect(controller.processing).toBeDefined();
      expect(controller.processing).toBe(false);
      expect($location.path.called).toBe(true);
      User.create.args[0][1]({
        success: false,
        message: 'message'
      });
      expect($location.path.calledOnce).toBe(true);
      expect(controller.error).toBeDefined();
      expect(controller.error).toBe('message');
    });
  });
});
