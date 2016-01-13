describe('Controller: LoginController', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, $rootScope, $scope, Auth;

  var loginCallback = {
    success: function(data) {
      return true;
    }
  };

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

    // sinon.stub(loginCallback, 'success', function() {});

    sinon.stub(Auth, 'login', function(args, fn) {
      return fn({});
    });

    spyOn($scope, '$on').and.callThrough();
    spyOn(controller, 'doLogin').and.callThrough();
    spyOn(controller, 'doLogout').and.callThrough();
    controller.doLogin();
    controller.doLogout();
    $scope.$on();
  }));

  it('should verify that the function runs', function() {
    expect($scope.$on).toBeDefined();
    expect($scope.$on).toHaveBeenCalled();
  });

  it('should verify that doLogin function is defined', function() {
    expect(controller.doLogin).toBeDefined();
    expect(controller.doLogin).toHaveBeenCalled();
  });

  it('should verify that doLogout function is defined', function() {
    expect(controller.doLogout).toBeDefined();
    expect(controller.doLogout).toHaveBeenCalled();
  });

  it('should call auth login', function() {
    expect(Auth.login.called).toBe(true);
    // expect(loginCallback.called).toBe(true);
  });
});
