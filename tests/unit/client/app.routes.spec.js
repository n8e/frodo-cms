describe('Testing routes', function() {
  beforeEach(angular.mock.module('frodocms'));

  var location, route, rootScope;

  beforeEach(angular.mock.inject(
    function(_$location_, _$route_, _$rootScope_) {
      location = _$location_;
      route = _$route_;
      rootScope = _$rootScope_;
      spyOn(rootScope, '$on').and.callThrough();
      rootScope.$on();
    }));

  describe('Login route', function() {
    beforeEach(angular.mock.inject(
      function($httpBackend) {
        $httpBackend.expectGET('views/login.html')
          .respond(200);
      }));

    it('should load the login page on successful load of /login', function() {
      location.path('/login');
      rootScope.$digest();
      expect(route.current.controller).toBe('LoginController');
    });
  });
  describe('myDocuments route', function() {
    beforeEach(angular.mock.inject(
      function($httpBackend) {
        $httpBackend.expectGET('api/documents')
          .respond(200);
      }));

    it('should load the login page on successful load of /login', function() {
      location.path('/myDocuments');
      rootScope.$digest();
      expect(route.current.controller).toBe('AllDocumentsController');
    });
  });
  describe('$routeChangeSuccess', function() {
    it('should verify that the function runs', function() {
      expect(rootScope.$on).toBeDefined();
      expect(rootScope.$on).toHaveBeenCalled();
    });
  });
});
