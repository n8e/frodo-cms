(function() {
  angular.module('frodocms.controllers')
    .controller('AllDocumentsController', ['$rootScope', 'Document', 'Auth',
      function($rootScope, Document, Auth) {
        var self = this;
        self.documents = '';
        self.allDocuments = '';

        $rootScope.$on('$routeChangeStart', function() {
          self.loggedIn = Auth.isLoggedIn();
          Auth.getUser(function(err, data) {
            self.user = data;
          });
        });

        Document.allDocuments(function(err, data) {
          self.allDocuments = data;
        });

        Document.all(function(err, data) {
          self.documents = data;
        });

        self.delete = function(id) {
          self.processing = true;
          Document.delete(id, function(data) {
            self.processing = false;
            if (data.message._id) {
              var documentRemovedID = data.message._id;
              // a new array for the documents
              self.documents = self.documents.filter(function(doc) {
                return doc._id !== documentRemovedID;
              });
            } else {
              self.error = data.message;
            }
          });
        };
      }
    ]);
})();
