(function() {
  angular.module('frodocms.controllers')
    .controller('AllDocumentsController', ['Document',
      function(Document) {
        var self = this;
        self.documents = '';
        self.allDocuments = '';

        Document.allDocuments(function(err, data) {
          self.allDocuments = data;
        });

        Document.all(function(err, data) {
          self.documents = data;
        });

        self.findWithAttr = function(array, attr, value) {
          for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
              return i;
            }
          }
        };

        self.delete = function(id) {
          self.processing = true;
          Document.delete(id, function(data) {
            self.processing = false;
            if (data.message._id) {
              // a new array for the documents
              self.documents = self.documents.splice(
                self.findWithAttr(self.documents, 'self.documents._id', id), 1);
            } else {
              self.error = data.message;
            }
          });
        };
      }
    ]);
})();
