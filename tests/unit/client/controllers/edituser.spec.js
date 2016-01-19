describe('Controller: EditUser Controller', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, $rootScope, Auth, User, $location;

  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    $rootScope = $injector.get('$rootScope');
    $rootScope.$on = sinon.spy();
    Auth = $injector.get('Auth');
    Auth.isLoggedIn = sinon.stub().returns(true);
    User = $injector.get('User');
    $location = $injector.get('$location');
    controller = $controller('EditUserController');
  }));

  describe('Initialization', function() {
    it('loggedIn should be a function and should call Auth.isLoggedIn',
      function() {
        expect(controller.loggedIn).toBeDefined();
        expect(typeof controller.loggedIn).toBe('boolean');
        expect(Auth.isLoggedIn.called).toBe(true);
        expect(controller.loggedIn).toBe(true);
      });
    it('$rootScope.$on should be called', function() {
      expect($rootScope.$on.called).toBe(true);
      Auth.getUser = sinon.spy();
      $rootScope.$on.args[0][1]();
      expect(controller.loggedIn).toBe(true);
      expect(Auth.isLoggedIn.calledTwice).toBe(true);
      expect(Auth.getUser.called).toBe(true);
      Auth.getUser.args[0][0]({
        data: 'data'
      });
      expect(controller.user).toBeDefined();
      expect(controller.user).toBe('data');
    });
    it('updateUser should be a function and should call Auth.getUser and ' +
      'User.update',
      function() {
        Auth.getUser = sinon.spy();
        User.update = sinon.spy();
        controller.updateUser();
        expect(Auth.getUser.called).toBe(true);
        controller.userData = {
          '_id': '568e2ea558bfb289851fed8e',
          'role': 'Administrator',
          'email': 'godmetweenciati@gmail.com',
          'username': 'nate',
          'password': '$2a$10$A6mxqRXzulVIHqCXiHRiae28' +
            'pRl.gD1wvU7XvBUoBHmk8C.bpRH7G',
          '__v': 0,
          'firstname': 'Nate',
          'lastname': 'Martin'
        };
        Auth.getUser.args[0][0]({
          data: {
            '_id': '568e2ea558bfb289851fed8e',
            'role': 'Administrator',
            'email': 'godmetweenciati@gmail.com',
            'username': 'nate',
            'password': '$2a$10$A6mxqRXzulVIHqCXiHRiae28' +
              'pRl.gD1wvU7XvBUoBHmk8C.bpRH7G',
            '__v': 0,
            'name': {
              'first': 'Nate',
              'last': 'Martin'
            }
          }
        });
        expect(User.update.called).toBe(true);
        $location.path = sinon.stub();
        User.update.args[0][1]({
          success: true,
          message: 'message'
        });
        expect(controller.processing).toBeDefined();
        expect(controller.processing).toBe(false);
        expect($location.path.called).toBe(true);
        User.update.args[0][1]({
          success: false,
          message: 'message'
        });
        expect($location.path.calledOnce).toBe(true);
        expect(controller.error).toBeDefined();
        expect(controller.error).toBe('message');
      });
  });
});
