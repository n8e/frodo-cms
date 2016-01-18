describe('Controller: DocumentController', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, Document;

  var documentCallback = {
    success: function() {
      return true;
    }
  };
  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    controller = $controller('DocumentController');
    Document = $injector.get('Document');
    controller.docData = {
      title: 'title',
      content: 'content'
    };

    sinon.stub(Document, 'create', function(args, fn) {
      return fn({});
    });

    sinon.stub(Document, 'all', function(fn) {
      return fn({});
    });

    spyOn(controller, 'createDocument').and.callThrough();
    controller.createDocument();
  }));

  describe('Initialization', function() {
    it('should verify that createDocument function is defined', function() {
      expect(controller.createDocument).toBeDefined();
      expect(controller.createDocument).toHaveBeenCalled();
    });
  });
});
