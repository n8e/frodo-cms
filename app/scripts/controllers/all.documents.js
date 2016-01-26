(function() {
  angular.module('frodocms.controllers', [])
    .controller('AllDocumentsController', ['Document', '$window',
      function(Document, $window) {
        var self = this;
        self.documents = '';

        Document.all(function(err, data) {
          self.documents = data;
        });

        self.delete = function(id) {
          self.processing = true;
          Document.delete(id, function(data) {
            self.processing = false;
            if (data.message._id) {
              // reload the view
              $window.location.reload();
            } else {
              self.error = data.message;
            }
          });
        };
      }
    ]);
})();
