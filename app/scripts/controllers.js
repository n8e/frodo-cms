(function() {
  angular.module('frodocms.controllers', [])
    .controller('MainController', function() {
      var vm = this;
      var isOpen = false;
      vm.isOpen = isOpen;
      vm.toggleMenu = function() {
        if (isOpen) {
          classie.remove(document.body, 'show-menu');
        } else {
          classie.add(document.body, 'show-menu');
        }
        isOpen = !isOpen;
      };
    })
    .controller('SignupController', ['$rootScope', '$location',
      'User',
      function($rootScope, $location, User) {
        var sm = this;
        sm.doSignup = function() {
          sm.processing = true;
          sm.error = '';
          sm.newUser = {
            username: sm.signupData.username,
            password: sm.signupData.password,
            firstname: sm.signupData.firstname,
            lastname: sm.signupData.lastname,
            email: sm.signupData.email,
            role: sm.signupData.role
          };
          User.create(sm.newUser, function(data) {
            sm.processing = false;
            if (data.success) {
              $location.path('/profile');
            } else {
              sm.error = data.message;
            }
          });
        };
      }
    ])
    .controller('LoginController', ['$rootScope', '$location',
      'Auth',
      function($rootScope, $location, Auth) {
        var vm = this;
        vm.loggedIn = Auth.isLoggedIn();
        $rootScope.$on('$routeChangeStart', function() {
          vm.loggedIn = Auth.isLoggedIn();
          Auth.getUser()
            .then(function(data) {
              vm.user = data.data;
            });
        });
        vm.doLogin = function() {
          vm.processing = true;
          vm.error = '';
          Auth.login(vm.loginData, function(data) {
            vm.processing = false;
            Auth.getUser()
              .then(function(data) {
                vm.user = data.data;
              });
            if (data.success) {
              $location.path('/profile');
            } else {
              vm.error = data.message;
            }
          });
        };
        vm.doLogout = function() {
          Auth.logout();
          vm.user = '';
          $location.path('/logout');
        };
      }
    ])
    .controller('DocumentController', ['Document', '$location',
      function(Document, $location) {
        var vm = this;
        Document.all(function(data) {
          vm.documents = data;
        });

        vm.createDocument = function() {
          vm.processing = true;
          vm.message = '';
          vm.documentData = {
            title: vm.docData.title,
            content: vm.docData.content
          };
          Document.create(vm.documentData, function(data) {
            vm.processing = false;
            if (data.success) {
              vm.message = data.message;
              //clear up the form
              vm.documentData = {};
              $location.path('/myDocuments');
            } else {
              vm.error = data.message;
            }
          });
        };
      }
    ])
    .controller('AllDocumentsController', ['Document',
      'Auth',
      function(Document, Auth) {
        var vm = this;
        Auth.getUser(function(data) {
          vm.user = data.data;
          vm.documents = '';
          Document.all(function(data) {
            vm.documents = data;
          });
        });
      }
    ])
    .controller('EditUserController', ['$rootScope', '$location', 'Auth',
      'User',
      function($rootScope, $location, Auth, User) {
        var vm = this;
        vm.loggedIn = Auth.isLoggedIn();
        $rootScope.$on('$routeChangeStart', function() {
          vm.loggedIn = Auth.isLoggedIn();
          Auth.getUser(function(data) {
              vm.user = data.data;
            });
        });
        vm.updateUser = function() {
          Auth.getUser(function(data) {
            vm.user = data.data;
            vm.updatedUser = {
              username: vm.user.username,
              password: vm.user.password,
              firstname: vm.userData.firstname || vm.user.name.first,
              lastname: vm.userData.lastname || vm.user.name.last,
              email: vm.userData.email || vm.user.email,
              role: vm.user.role
            };
            User.update(vm.updatedUser, function(data) {
              vm.processing = false;
              if (data.success) {
                $location.path('/myDocuments');
              } else {
                vm.error = data.message;
              }
            });
          });
        };
      }
    ]);
})();
