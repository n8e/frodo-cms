describe('Service: Document Service', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var $http, Document;

  beforeEach(angular.mock.inject(function($injector) {
    $http = $injector.get('$http');
    Document = $injector.get('Document');
  }));

  it('allDocuments should be a function and should be defined', function() {
    Document.allDocuments();
    expect(Document.allDocuments).toBeDefined();
    expect(typeof Document.allDocuments).toBe('function');
  });
  it('all should be a function and should be defined', function() {
    Document.all();
    expect(Document.all).toBeDefined();
    expect(typeof Document.all).toBe('function');
  });
  it('create should be a function and should be defined', function() {
    $http.get = sinon.stub();
    Document.create();
    expect(Document.create).toBeDefined();
    expect(typeof Document.create).toBe('function');
    // $http.success.args[0][0]({
    //   id: 'id'
    // });
    // expect($http.get.called).toBe(true);
  });
  it('delete should be a function and should be defined', function() {
    //   Document.delete();
    expect(Document.delete).toBeDefined();
    expect(typeof Document.delete).toBe('function');
  });
});
