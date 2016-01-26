describe('Service: User Service', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var $http, User;

  beforeEach(angular.mock.inject(function($injector) {
    $http = $injector.get('$http');
    User = $injector.get('User');
    spyOn(User, 'create').and.callThrough();
    spyOn(User, 'update').and.callThrough();
    spyOn(User, 'all').and.callThrough();
    User.create();
    User.update();
    User.all();
  }));

  it('should verify that allUsers function exists and is called', function() {
    expect(User.create).toBeDefined();
    expect(User.create).toHaveBeenCalled();
  });

  it('should verify that all function exists and is called', function() {
    expect(User.update).toBeDefined();
    expect(User.update).toHaveBeenCalled();
  });
  
  it('should verify that create function exists and is called', function() {
    expect(User.all).toBeDefined();
    expect(User.all).toHaveBeenCalled();
  });
});
