describe('Controller: AllDocuments Controller', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, Document;
  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    controller = $controller('AllDocumentsController');
    Document = $injector.get('Document');
  }));

  describe('Initialization', function() {
    it('should verify that updateUser function is defined', function() {
      console.log('DOCS: ' + controller.documents);
      expect(controller.documents).toBeDefined();
    });
  });
});
