describe('Controller: DocumentController', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, Document, $location;

  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    Document = $injector.get('Document');
    $location = $injector.get('$location');
    controller = $controller('DocumentController');
  }));

  describe('Initialization', function() {
    it('createDocument is a function and should call Document.create',
      function() {
        Document.create = sinon.spy();
        controller.docData = {
          title: 'title',
          content: 'content'
        };
        controller.createDocument();
        expect(Document.create.called).toBe(true);
        expect(typeof Document.create).toBe('function');
        expect(controller.processing).toBe(true);
        expect(controller.docData).toBeDefined();
        expect(typeof controller.docData).toBe('object');
        $location.path = sinon.stub();
        Document.create.args[0][1]({
          success: true,
          message: 'message'
        });
        expect(controller.processing).toBe(false);
        expect(controller.message).not.toBe('');
        expect($location.path.called).toBe(true);
        Document.create.args[0][1]({
          success: false,
          message: 'message'
        });
        expect($location.path.calledOnce).toBe(true);
        expect(controller.error).toBeDefined();
        expect(controller.error).toBe('message');
      });
  });
});
