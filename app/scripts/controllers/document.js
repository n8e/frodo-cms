(function() {
  angular.module('frodocms.controllers')
    .controller('DocumentController', ['Document', '$location',
      function(Document, $location) {
        var self = this;
        // to create a new document
        self.createDocument = function() {
          self.processing = true;
          self.message = '';
          self.documentData = {
            title: self.docData.title,
            content: self.docData.content
          };

          Document.create(self.documentData, function(data) {
            self.processing = false;
            if (data.success) {
              self.message = data.message;
              //clear up the form
              self.documentData = {};
              $location.path('/myDocuments');
            } else {
              self.error = data.message;
            }
          });
        };
      }
    ]);
})();
