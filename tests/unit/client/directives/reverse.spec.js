// describe('Unit testing reverseDirective', function() {
//   var testArray, $scope;
//   beforeEach(module('frodocms'));
//   // Store references to $rootScope and $compile
//   // so they are available to all tests in this describe block
//   beforeEach(inject(function($compile, $rootScope){
//     $compile = $compile;
//     $scope = $rootScope;
//     testArray = ['chew', 'dragon', 'head'];
//     testArray = $compile(testArray)($rootScope);
//   }));

//   it('Reverses the testArray array', function() {
//     $scope.$digest();
//     console.log('THIS SCOPE ' + testArray);
//     expect(testArray).toBe(['head', 'dragon', 'chew']);
//   });
// });