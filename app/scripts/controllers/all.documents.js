(function() {
  angular.module('frodocms.controllers')
    .controller('AllDocumentsController', ['$rootScope', 'Document', 'Auth',
      function($rootScope, Document, Auth) {
        var self = this;
        self.documents = [];
        self.allDocuments = [];

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

        self.update = function(id) {
          self.processing = true;
          self.updatedDoc = {
            title: self.docData.title || self.documentData.title,
            content: self.docData.content || self.documentData.content
          };
          Document.update(id, self.docData, function(data) {
            self.processing = false;
            if (data.success) {
              Document.all(function(err, data) {
                self.documents = data;
              });
            } else {
              self.error = data.message;
            }
          });
        };

        self.delete = function(id) {
          self.processing = true;
          Document.delete(id, function(data) {
            self.processing = false;
            if (data.message._id) {
              var documentRemovedID = data.message._id;
              // for all the documents
              self.allDocuments = self.allDocuments.filter(function(doc) {
                return doc._id !== documentRemovedID;
              });
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
