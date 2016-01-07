(function() {
  angular.module('frodocms.controllers', [])
    .controller('MainController', function() {
      var vm = this;
      var isOpen = false;
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
          var newUser = {
            username: sm.signupData.username,
            password: sm.signupData.password,
            firstname: sm.signupData.firstname,
            lastname: sm.signupData.lastname,
            email: sm.signupData.email,
            role: sm.signupData.role
          };
          User.create(newUser)
            .success(function(data) {
              sm.processing = false;
              if (data.success) {
                $location.path('/');
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
          Auth.login(vm.loginData.username, vm.loginData.password)
            .success(function(data) {
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
          $location.path('/logout');
        };
      }
    ])
    .controller('DocumentController', ['Document',
      'socketio',
      function(Document, socketio) {
        var vm = this;
        Document.all()
          .success(function(data) {
            vm.documents = data;
          });

        vm.createDocument = function() {
          vm.processing = true;
          vm.message = '';
          vm.documentData = {
            title: vm.docData.title,
            content: vm.docData.content
          };
          Document.create(vm.documentData)
            .success(function(data) {
              vm.processing = false;
              //clear up the form
              vm.documentData = {};
              vm.message = data.message;
            });
        };
        socketio.on('document', function(data) {
          vm.stories.push(data);
        });
      }
    ])
    .controller('AllDocumentsController', function(socketio, documents) {
      var vm = this;
      vm.documents = documents.data;
      socketio.on('document', function(data) {
        vm.documents.push(data);
      });
    })
    .controller('EditUserController', ['$rootScope', '$location', 'Auth',
      'User',
      function($rootScope, $location, Auth, User) {
        var vm = this;
        vm.loggedIn = Auth.isLoggedIn();
        $rootScope.$on('$routeChangeStart', function() {
          vm.loggedIn = Auth.isLoggedIn();
          Auth.getUser()
            .then(function(data) {
              vm.user = data.data;
              console.log('CURRENT USER ' + vm.user);
            });
        });
        vm.updateUser = function() {
          console.log('IN HERE');
          Auth.getUser()
            .then(function(data) {
              vm.user = data.data;
              var updatedUser = {
                username: vm.user.username,
                password: vm.user.password,
                firstname: vm.userData.firstname || vm.user.name.first,
                lastname: vm.userData.lastname || vm.user.name.last,
                email: vm.userData.email || vm.user.email,
                role: vm.user.role
              };
              User.update(updatedUser)
                .success(function(data) {
                  vm.processing = false;
                  if (data.success) {
                    console.log('Update Response ' + data);
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
