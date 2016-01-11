describe('Routes: appRoutes', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var $locationProvider, $routeProvider, appRoutes;

  beforeEach(angular.mock.inject(function($injector) {
    $locationProvider = $injector.get('$locationProvider');
    $routeProvider = $injector.get('$routeProvider');
    appRoutes = $injector.get('appRoutes');
    spyOn(appRoutes, 'login').and.callThrough();
    appRoutes.getUser();
  }));

  it('should verify that login function exists and is called', function() {
    expect(appRoutes.login).toBeDefined();
    expect(appRoutes.login).toHaveBeenCalled();
  });
});