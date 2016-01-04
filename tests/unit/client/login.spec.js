describe('LoginCtrl tests', function() {
  var scope,
    Users,
    controller;
  beforeEach(function() {
    module('frodocms');
  });

  beforeEach(inject(function($injector) {
    $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    Users = $injector.get('Users');
    controller = $controller('LoginController', {
      $scope: scope,
      Users: Users
    });
  }));

  it('should call the login function in the Users service', function() {
    spyOn(Users, 'login');
    scope.doLogin();
    expect(Users.doLogin).toHaveBeenCalled();
  });
});
