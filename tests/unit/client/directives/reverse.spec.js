describe('Directive: reverseDirective', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  var reverse;
  var items = ['Mustapha', 'Mwaniki', 'Sass'];

  beforeEach(angular.mock.inject(function($injector) {
    reverse = $injector.get('reverse');
    spyOn(reverse).and.callThrough();
    reverse(items);
  }));

  it('should verify that login function exists and is called', function() {
    expect(reverse).toBeDefined();
    expect(reverse).toHaveBeenCalled();
  });
});