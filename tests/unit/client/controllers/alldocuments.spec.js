describe('Controller: AllDocuments Controller', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var controller, Document, $window;
  // instantiate the main controller
  beforeEach(function() {
    $window = {
      location: {
        reload: sinon.stub()
      }
    };
    angular.mock.module(function($provide) {
      $provide.value('$window', $window);
    });
    angular.mock.inject(function($injector, $controller) {
      Document = $injector.get('Document');
      Document.all = sinon.spy();
      controller = $controller('AllDocumentsController');
    });
  });

  describe('Initialization', function() {
    it('should verify that Document.all function is defined and is called',
      function() {
        expect(Document.all.called).toBe(true);
        expect(typeof Document.all).toBe('function');
        var data = {
            data: 'data'
          },
          err = 'err';
        Document.all.args[0][0](err, data);
        expect(controller.documents).toBeDefined();
        expect(controller.documents.data).toBe('data');
      });

    it('should verify that Document.delete function is defined and is called',
      function() {
        Document.delete = sinon.spy();
        controller.delete('id');
        expect(Document.delete.called).toBe(true);
        expect(typeof Document.delete).toBe('function');
        expect(controller.processing).toBe(true);
        var data = {
          message: {
            _id: true
          }
        };
        controller.documents = {
          filter: function() {
            return 'filter';
          }
        };
        Document.delete.args[0][1](data);
        expect(controller.processing).toBe(false);
        Document.delete.args[0][1]({
          message: 'message'
        });
        expect(controller.error).toBeDefined();
        expect(controller.error).toBe('message');
      });

    it('should verify that Document.update function is defined and is called',
      function() {
        Document.update = sinon.spy();
        controller.docData = {
          title: 'title',
          content: 'content'
        };
        controller.update('id');
        expect(Document.update.called).toBe(true);
        expect(typeof Document.delete).toBe('function');
        expect(controller.processing).toBe(true);
        expect(controller.docData).toBeDefined();

        Document.all = sinon.spy();
        Document.update.args[0][2]({
          success: true
        });
        expect(Document.all.called).toBe(true);

        Document.all.args[0][0]('err','data');
        expect(controller.documents).toEqual('data');
        Document.update.args[0][2]({
          success: false,
          message: 'message'
        });
        expect(controller.error).toBeDefined();
        expect(controller.error).toEqual('message');
      });
  });
});
