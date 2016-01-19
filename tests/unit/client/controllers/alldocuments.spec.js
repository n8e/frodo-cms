describe('Controller: AllDocuments Controller', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, Document, Auth;
  // instantiate the main controller
  beforeEach(angular.mock.inject(function($injector, $controller) {
    Auth = $injector.get('Auth');
    Auth.getUser = sinon.spy();
    controller = $controller('AllDocumentsController');
    Document = $injector.get('Document');

  }));

  describe('Initialization', function() {
    it('should verify that updateUser function is defined', function() {
      expect(Auth.getUser.called).toBe(true);
      var data = {
        data: 'data'
      };
      Document.all = sinon.spy();
      Auth.getUser.args[0][0](data);
      expect(Document.all.called).toBe(true);
      Document.all.args[0][0](data);
      expect(controller.documents.data).toBe('data');
    });
  });
});
