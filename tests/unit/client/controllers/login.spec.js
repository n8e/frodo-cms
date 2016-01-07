describe('LoginController', function() {
  beforeEach(module('frodocms'));
  var loginController, $rootScope;

  beforeEach(inject(function($controller) {
    // mockAuth = module(function($provide) {
    //   $provide.factory('Auth', ['$q', function($q) {
    //     function doLogin(username, password) {
    //       if (passPromise) {
    //         return $q.when();
    //       } else {
    //         return $q.reject();
    //       }
    //     }
    //     return {
    //       doLogin: doLogin
    //     };
    //   }]);
    // });
    // // = Auth;
    loginController = $controller('LoginController', { scope: $rootScope});
  }));

  describe('test property', function() {
    it('verifies that the test property resolves to "Test Text"', function() {
      // vm.loginData.username = 'smalik';
      // vm.loginData.password = '12345';
      // loginController.doLogin();
      // Auth.login(vm.loginData.username, vm.loginData.password);
      expect(loginController.test).toEqual('Test Text');
      // expect(loginController.doLogin).toBeDefined();
      // expect(loginController.doLogin).toHaveBeenCalled();
    });
  });
});
