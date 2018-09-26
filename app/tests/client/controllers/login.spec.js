describe('Controller: LoginController', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, $rootScope, $location, Auth;

  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    $rootScope = $injector.get('$rootScope');
    $rootScope.$on = sinon.spy();
    $location = $injector.get('$location');
    Auth = $injector.get('Auth');
    Auth.isLoggedIn = sinon.stub().returns(true);
    controller = $controller('LoginController', {
      $rootScope: $rootScope
    });
    controller.loginData = {
      username: 'smalik',
      password: '12345'
    };
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
      Auth.getUser.args[0][0]('err', 'data');
      expect(controller.user).toBeDefined();
      expect(controller.user).toBe('data');
    });

    it('doLogin should be a function and should call Auth.login and ' +
      'Auth.getUser',
      function() {
        Auth.login = sinon.spy();
        controller.doLogin();
        expect(Auth.login.called).toBe(true);
        controller.loginData = {
          'username': 'nate',
          'password': '$2a$10$A6mxqRXzulVIHqCXiHRiae28' +
            'pRl.gD1wvU7XvBUoBHmk8C.bpRH7G'
        };
        expect(controller.loginData).toBeDefined();
        expect(controller.processing).toBeDefined();
        expect(controller.processing).toBe(true);
        Auth.getUser = sinon.spy();
        $location.path = sinon.stub();
        Auth.login.args[0][1]({
          success: true,
          message: 'message'
        });
        expect(controller.processing).toBeDefined();
        expect(controller.processing).toBe(false);
        expect($location.path.called).toBe(true);
        Auth.login.args[0][1]({
          success: false,
          message: 'message'
        });
        expect($location.path.calledOnce).toBe(true);
        expect(controller.error).toBeDefined();
        expect(controller.error).toBe('message');
        Auth.getUser.args[0][0]('err', 'data');
        expect(controller.user).toBeDefined();
        expect(controller.user).toBe('data');
        expect(Auth.getUser.called).toBe(true);
      });

    it('doLogout should be a function and should call Auth.logout function',
      function() {
        Auth.logout = sinon.spy();
        $location.path = sinon.stub();
        controller.doLogout();
        expect(Auth.logout.called).toBe(true);
        expect(controller.user).toBe('');
        expect($location.path.called).toBe(true);
      });
  });
});
