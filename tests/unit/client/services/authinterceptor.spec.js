describe('Service: AuthInterceptor Service', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var $location, $q, AuthToken, AuthInterceptor;
  var config = 'config', response = 'response';

  beforeEach(angular.mock.inject(function($injector) {
    $location = $injector.get('$location');
    $q = $injector.get('$q');
    AuthToken = $injector.get('AuthToken');
    AuthInterceptor = $injector.get('AuthInterceptor');
    spyOn(AuthInterceptor, 'request').and.callThrough();
    spyOn(AuthInterceptor, 'responseError').and.callThrough();
    AuthInterceptor.request(config);
    AuthInterceptor.responseError(response);
  }));

  it('should verify that request function exists and is called', function() {
    expect(AuthInterceptor.request).toBeDefined();
    expect(AuthInterceptor.request).toHaveBeenCalled();
  });
  it('should verify that responseError function exists and is called', function() {
    expect(AuthInterceptor.responseError).toBeDefined();
    expect(AuthInterceptor.responseError).toHaveBeenCalled();
  });
});