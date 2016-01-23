describe('Service: Auth', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var $http, $q, AuthToken, Auth;
  var username = 'smalik', password = '12345';

  beforeEach(angular.mock.inject(function($injector) {
    $http = $injector.get('$http');
    $q = $injector.get('$q');
    AuthToken = $injector.get('AuthToken');
    Auth = $injector.get('Auth');
    
    spyOn(Auth, 'login').and.callThrough();
    spyOn(Auth, 'isLoggedIn').and.callThrough();
    spyOn(Auth, 'logout').and.callThrough();
    spyOn(Auth, 'getUser').and.callThrough();
    Auth.login(username, password);
    Auth.getUser();
    Auth.isLoggedIn();
    Auth.logout();
  }));

  it('should verify that login function exists and is called', function() {
    expect(Auth.login).toBeDefined();
    expect(Auth.login).toHaveBeenCalled();
  });
  it('should verify that getUser function exists and is called', function() {
    expect(Auth.getUser).toBeDefined();
    expect(Auth.getUser).toHaveBeenCalled();
  });
  it('should verify that isLoggedIn function exists and is called', function() {
    expect(Auth.isLoggedIn).toBeDefined();
    expect(Auth.isLoggedIn).toHaveBeenCalled();
  });
  it('should verify that logout function exists and is called', function() {
    expect(Auth.logout).toBeDefined();
    expect(Auth.logout).toHaveBeenCalled();
  });
});