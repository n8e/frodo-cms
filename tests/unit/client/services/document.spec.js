describe('Service: Document Service', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var $http, Document;

  beforeEach(angular.mock.inject(function($injector) {
    $http = $injector.get('$http');
    Document = $injector.get('Document');
    spyOn(Document, 'allDocuments').and.callThrough();
    spyOn(Document, 'all').and.callThrough();
    spyOn(Document, 'create').and.callThrough();
    Document.allDocuments();
    Document.all();
    Document.create();
  }));

  it('should verify that allDocuments function exists and is called', function() {
    expect(Document.allDocuments).toBeDefined();
    expect(Document.allDocuments).toHaveBeenCalled();
  });
  it('should verify that all function exists and is called', function() {
    expect(Document.all).toBeDefined();
    expect(Document.all).toHaveBeenCalled();
  });
  it('should verify that create function exists and is called', function() {
    expect(Document.create).toBeDefined();
    expect(Document.create).toHaveBeenCalled();
  });
});
