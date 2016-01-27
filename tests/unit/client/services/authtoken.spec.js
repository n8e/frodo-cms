describe('Service: AuthToken Service', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var $window, AuthToken;

  beforeEach(angular.mock.inject(function($injector) {
    $window = $injector.get('$window');
    AuthToken = $injector.get('AuthToken');
    spyOn(AuthToken, 'getToken').and.callThrough();
    spyOn(AuthToken, 'setToken').and.callThrough();
    AuthToken.getToken();
    AuthToken.setToken('Token');
  }));

  it('should verify that getToken function exists and is called', function() {
    expect(AuthToken.getToken).toBeDefined();
    expect(AuthToken.getToken).toHaveBeenCalled();
  });
  
  it('should verify that setToken function exists and is called', function() {
    expect(AuthToken.setToken).toBeDefined();
    expect(AuthToken.setToken).toHaveBeenCalled();
  });
});