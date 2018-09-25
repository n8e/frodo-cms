describe('Filter: reverseDirective', function() {
  // new instance of the module
  beforeEach(angular.mock.module('frodocms'));

  it('should verify that reverse filter is called',
    angular.mock.inject(function(reverseFilter) {
      var result = reverseFilter(['Mustapha', 'Mwaniki', 'Sass']);
      expect(result).toEqual(['Sass', 'Mwaniki', 'Mustapha']);
    }));
});
