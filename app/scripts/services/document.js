(function() {
  angular.module('frodocms.services', [])
    .factory('Document', ['$http', function($http) {
      var documentFactory = {};
      var id;

      // all documents indiscriminately
      documentFactory.allDocuments = function() {
        return $http.get('/api/documents');
      };

      // all documents for a specific user
      documentFactory.all = function(cb) {
        $http.get('/api/me')
          .success(function(data) {
            id = data._id;
            $http.get('/api/users/' + id + '/documents')
              .success(function(data) {
                cb(null, data);
              })
              .error(function(err) {
                cb(err, null);
              });
          });
      };

      // create a new document
      documentFactory.create = function(documentData, callback) {
        return $http.post('/api/documents', documentData)
          .success(function(data) {
            callback(data);
          });
      };

      // to delete user
      documentFactory.delete = function(docId, cb) {
        $http.delete('/api/documents/' + docId)
          .success(function(data) {
            cb(data);
          })
          .error(function(err) {
            cb(err);
          });
      };

      // return self
      return documentFactory;
    }]);
})();
