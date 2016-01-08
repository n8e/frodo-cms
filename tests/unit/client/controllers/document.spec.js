describe('Controller: DocumentController', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, Document, socketio;
  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    controller = $controller('DocumentController');
    Document = $injector.get('Document');
    socketio = $injector.get('socketio');
  }));

  describe('Initialization', function() {
    it('should verify that updateUser function is defined', function() {
      expect(controller.createDocument).toBeDefined();
    });
  });
});