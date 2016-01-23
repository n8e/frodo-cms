describe('Controller: Main Controller', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller;
  // instantiate the main controller
  beforeEach(angular.mock.inject(function($controller) {
    controller = $controller('MainController');
    spyOn(controller, 'toggleMenu').and.callThrough();
    controller.toggleMenu();
  }));

  describe('Initialization', function() {
    it('should verify that toggleMenu function is defined', function() {
      expect(controller.toggleMenu).toBeDefined();
      expect(controller.toggleMenu).toHaveBeenCalled();
    });
    it('should verify that isOpen is defined', function() {
      expect(controller.isOpen).toBeDefined();
    });
    it('should verify that isOpen is a falsy value', function() {
      expect(controller.isOpen).toBe(false);
    });
  });
});