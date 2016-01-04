var DocCtrl = require('../controllers/documents'),
  UserCtrl = require('../controllers/users'),
  RolesCtrl = require('../controllers/roles'),
  auth = require('../controllers/auth');

module.exports = function(app, express) {
  var api = express.Router();
  api.post('/users', UserCtrl.create);
  api.get('/users', UserCtrl.getAll);
  api.get('/users/roles', RolesCtrl.get);
  api.post('/users/roles', RolesCtrl.create);
  api.post('/users/login', UserCtrl.login);
  // middleware
  api.use(auth.authenticate);
  // routes that need checking for a legitimate token
  api.get('/documents', DocCtrl.getAll);
  api.get('/documents/user', DocCtrl.getAllDocumentsByRoleUser);
  api.get('/documents/admin', DocCtrl.getAllDocumentsByRoleAdministrator);
  api.get('/documents/date', DocCtrl.getAllDocumentsByDate);
  api.get('/users/logout', UserCtrl.logout);
  api.post('/documents', DocCtrl.create);
  api.get('/users/:id/documents', DocCtrl.getAllDocumentsParticularUser);
  api.get('/users/:id', UserCtrl.get);
  api.put('/documents/:id', DocCtrl.update);
  api.put('/users/:id', UserCtrl.update);
  api.delete('/users/:id', UserCtrl.delete);
  api.get('/documents/:id', DocCtrl.get);
  api.delete('/documents/:id', DocCtrl.delete);
  api.get('/me', function(req, res) {
    res.send(req.decoded);
  });
  return api;
};
