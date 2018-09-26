var mongoose = require('mongoose'),
  assert = require('assert'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  moment = require('moment'),
  app = require('..'),
  documentHelper = require('./helpers/documentHelper');

chai.use(chaiHttp);

describe('SERVER Tests', function () {

  before(function (done) {
    mongoose.connect(process.env.TEST_DATABASE_URL);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      console.log('We are connected to test database!');
      done();
    });
  });

  after(function () {
    return mongoose.connection.close();
  });

  describe('Roles:', function () {

    it('validates that the seeded roles are stored in database', function (done) {
      chai.request(app)
        .get('/api/users/roles')
        .end(function (err, res) {
          // expected responses after seeding
          assert.equal(res.status, 200);
          assert.equal(res.body.length, 2);
          if (res.body[0].id === 1) {
            assert.equal(res.body[0].title, 'Administrator');
          }
          if (res.body[0].id === 2) {
            assert.equal(res.body[0].title, 'User');
          }
          if (res.body[1].id === 1) {
            assert.equal(res.body[1].title, 'Administrator');
          }
          if (res.body[1].id === 2) {
            assert.equal(res.body[1].title, 'User');
          }
          done();
        })
    });

    it('validates that a new role created has a unique title', function (done) {
      chai.request(app)
        .post('/api/users/roles')
        .send({
          id: 1,
          title: 'Administrator'
        })
        .end(function (err, res) {
          console.log('gfvdshjabckjnakmdslcknjdbchjakbn,kxcnbjsbdjhbcnmasnmdcklnjdbhjn', err)
          assert.equal(res.status, 409);
          assert.equal(res.body.code, 11000);
          assert.equal(res.body.index, 0);
          assert.equal(res.body.errmsg.includes('E11000 duplicate key error index'), true);
          done();
        });
    });
  });

  describe('Users:', function () {

    it('should show that a new user is created (POST /api/users)', function (done) {
      chai.request(app)
        .post('/api/users')
        .send({
          username: 'batman',
          firstname: 'Bruce',
          lastname: 'Wayne',
          email: 'batman@cave.com',
          password: '12345',
          role: 2
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(typeof res.body, 'object');
          assert.equal(res.body.success, true);
          assert.equal(res.body.message, 'User has been created!');
          done();
        });
    });

    it('validates that the new user created is unique (POST /api/users)', function (done) {
      chai.request(app)
        .post('/api/users')
        .send({
          username: 'batman',
          firstname: 'Bruce',
          lastname: 'Wayne',
          email: 'batman@cave.com',
          password: '12345',
          role: 2
        })
        .end(function (err, res) {
          assert.equal(res.status, 403);
          assert.equal(typeof res.body, 'object');
          assert.equal(res.body.code, 11000);
          assert.equal(res.body.index, 0);
          done();
        });
    });

    it('validates that all users are returned when getAllUsers ' +
      'function in the controller is called (GET /api/users)', function (done) {
        chai.request(app)
          .get('/api/users')
          .set('Accept', 'application/json')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body.length > 0, true);
            assert.equal(res.body[res.body.length - 1].username, 'batman');
            assert.equal(res.body[res.body.length - 1].email, 'batman@cave.com');
            assert.equal(typeof res.body, 'object');
            done();
          });
      });

    it('validates that the new user created has a defined role, has a first name and a last name',
      function (done) {
        chai.request(app)
          .get('/api/users')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.body[res.body.length - 1].role, 'User');
            assert.equal(res.body[res.body.length - 1].name.first, 'Bruce');
            assert.equal(res.body[res.body.length - 1].name.last, 'Wayne');
            done();
          });
      });

    it('validates that a valid user can be logged in', function (done) {
      chai.request(app)
        .post('/api/users/login')
        .send({
          username: 'smalik',
          password: '12345'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.success, true);
          assert.equal(res.body.message, 'Successfully logged in!');
          assert.equal(res.body.token !== undefined, true);
          done();
        });
    });

    it('validates that an invalid user cannot be logged in', function (done) {
      chai.request(app)
        .post('/api/users/login')
        .send({
          username: 'rupertm',
          password: '67891'
        })
        .end(function (err, res) {
          assert.equal(res.status, 401);
          assert.equal(res.body.message, 'User does not exist');
          done();
        });
    });
  });

  describe('Documents:', function () {

    var authToken, userId, doc1id, doc2id, doc3id, doc4id;

    describe('Document', function () {
      it('validates that one has to be authenticated to access documents (GET /api/documents)',
        function (done) {
          chai.request(app)
            .get('/api/documents')
            .then(function (err, res) {
              var response = JSON.parse(err.text);

              assert.equal(err.status, 403);
              assert.equal(response.success, false);
              assert.equal(response.message, 'No token provided!');
              done();
            });
        });
    });

    describe('Document tests requiring authentication', function () {
      // perform login function first
      beforeEach(function login(done) {
        chai.request(app)
          .post('/api/users/login')
          .send(documentHelper.user)
          .then(function (res) {
            userId = res.body.id;
            authToken = res.body.token;
            done();
          });
      });

      it('validates that a document is created by a user logged in (POST /api/documents)', function (done) {
        chai.request(app)
          .post('/api/documents')
          .set('x-access-token', authToken)
          .send(documentHelper.document1)
          .end(function (err, res) {
            doc1id = res.body.document._id;

            assert.equal(res.status, 200);
            assert.equal(typeof res.body.document, 'object');
            assert.equal(res.body.document._id !== undefined, true);
            assert.equal(res.body.document.title, documentHelper.document1.title);
            assert.equal(res.body.document.content, documentHelper.document1.content);
            done();
          });
      });

      it('validates that a document is created by a user logged in ' +
        '(POST /api/documents)', function (done) {
          chai.request(app)
            .post('/api/documents')
            .set('x-access-token', authToken)
            .send(documentHelper.document2)
            .end(function (err, res) {
              doc2id = res.body.document._id;

              assert.equal(res.status, 200);
              assert.equal(typeof res.body.document, 'object');
              assert.equal(res.body.document._id !== undefined, true);
              assert.equal(res.body.document.title, documentHelper.document2.title);
              assert.equal(res.body.document.content, documentHelper.document2.content);
              done();
            });
        });

      it('validates that one has to be authenticated to access documents ' +
        '(GET /api/documents)', function (done) {
          chai.request(app)
            .get('/api/documents')
            .set('x-access-token', authToken)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(typeof res.body, 'object');
              assert.equal(res.body.length > 0, true);
              assert.equal(res.body[res.body.length - 1].title, documentHelper.document2.title);
              assert.equal(res.body[res.body.length - 1].content, documentHelper.document2.content);
              done();
            });
        });

      it('validates that all documents, limited by a specified number ' +
        'and ordered by published date, that can be accessed by a ' +
        'role USER, are returned when getAllDocumentsByRoleUser is called', function (done) {
          chai.request(app)
            .get('/api/documents/user')
            .set('x-access-token', authToken)
            .end(function (err, res) {
              var itemOne = res.body[0];
              var itemLast = res.body[res.body.length - 2];

              assert.equal(res.status, 200);
              assert.equal(itemLast.dateCreated, itemOne.dateCreated);
              done();
            });
        });

      it('validates that all documents, limited by a specified number, that were' +
        ' published on a certain date, are returned when getAllDocumentsByDate ' +
        'is called', function (done) {
          chai.request(app)
            .get('/api/documents/date')
            .set('x-access-token', authToken)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(res.body.length > 1, true);
              assert.equal(res.body[0].dateCreated.includes(moment(new Date()).format('YYYY-MM-DD')), true);
              done();
            });
        });
    });

    // tests for administrator documents
    describe('Administrator Documents', function () {
      beforeEach(function logout(done) {
        chai.request(app)
          .get('/api/users/logout')
          .set('x-access-token', authToken)
          .end(function () {
            authToken = '';
            done();
          });
      });

      // login the administrator
      beforeEach(function loginAdmin(done) {
        chai.request(app)
          .post('/api/users/login')
          .send({
            username: 'Sonnie',
            password: '12345'
          })
          .end(function (err, res) {
            userId = res.body.id;
            authToken = res.body.token;
            done();
          });
      });

      it('validates that a document is created by a admin logged in ' +
        '(POST /api/documents)', function (done) {
          chai.request(app)
            .post('/api/documents')
            .set('x-access-token', authToken)
            .send(documentHelper.document3)
            .end(function (err, res) {
              doc3id = res.body.document._id;

              assert.equal(res.status, 200);
              assert.equal(res.headers['content-type'], 'application/json; charset=utf-8');
              assert.equal(typeof res.body.document, 'object');
              assert.equal(res.body.document._id !== undefined, true);
              assert.equal(res.body.document.title, documentHelper.document3.title);
              assert.equal(res.body.document.content, documentHelper.document3.content);
              done();
            });
        });

      it('validates that a document is created by a admin logged in ' +
        '(POST /api/documents)', function (done) {
          chai.request(app)
            .post('/api/documents')
            .set('x-access-token', authToken)
            .send(documentHelper.document4)
            .end(function (err, res) {
              doc4id = res.body.document._id;

              assert.equal(res.status, 200);
              assert.equal(typeof res.body.document, 'object');
              assert.equal(res.body.document._id !== undefined, true);
              assert.equal(res.body.document.title, documentHelper.document4.title);
              assert.equal(res.body.document.content, documentHelper.document4.content);
              done();
            });
        });

      it('validates that all documents, limited by a specified number and ordered by published ' +
        'date, that can be accessed by a role ADMINISTRATOR, are returned when ' +
        'getAllDocumentsByRoleAdministrator is called', function (done) {
          chai.request(app)
            .get('/api/documents/admin')
            .set('x-access-token', authToken)
            .end(function (err, res) {
              var lastItem = res.body[res.body.length - 1];
              var firstItem = res.body[res.body.length - 2];

              assert.equal(res.status, 200);
              assert.equal(lastItem.dateCreated, firstItem.dateCreated);
              done();
            });
        });

      it('validates that any users document can be updated by an ' +
        'Administrator (PUT /api/documents)/:id', function (done) {
          chai.request(app)
            .put('/api/documents/' + doc1id)
            .set('x-access-token', authToken)
            .send({
              title: 'Frodo',
              content: 'A character in LOTR.'
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(typeof res.body, 'object');
              assert.equal(res.body.success, true);
              assert.equal(res.body.message, 'Successfully updated Document!');
              done();
            });
        });

      it('validates that any users document can be deleted by an ' +
        'Administrator (DELETE /api/documents)/:id', function (done) {
          chai.request(app)
            .delete('/api/documents/' + doc2id)
            .set('x-access-token', authToken)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.equal(typeof res.body, 'object');
              assert.equal(res.body.message.title, documentHelper.document2.title);
              assert.equal(res.body.message.content, documentHelper.document2.content);
              done();
            });
        });
    });

    // tests for manipulating documents access
    describe('Document tests requiring authentication', function () {
      // logout first
      beforeEach(function logout(done) {
        chai.request(app)
          .get('/api/users/logout')
          .set('x-access-token', authToken)
          .end(function () {
            authToken = '';
            done();
          });
      });

      // perform login function first
      beforeEach(function login(done) {
        chai.request(app)
          .post('/api/users/login')
          .send({
            username: 'tn',
            password: '12345'
          })
          .end(function (err, res) {
            userId = res.body.id;
            authToken = res.body.token;
            done();
          });
      });

      it('validates that a document can only be updated by the creator or an ' +
        'Administrator (PUT /api/documents/:id)', function (done) {
          chai.request(app)
            .put('/api/documents/' + doc1id)
            .set('x-access-token', authToken)
            .send({
              title: 'Frodo',
              content: 'A character in LOTR.'
            })
            .end(function (err, res) {
              assert.equal(res.status, 403);
              assert.equal(typeof res.body, 'object');
              assert.equal(res.body.message, 'Forbidden to update this document.');
              done();
            });
        });

      it('validates that a document can only be deleted by the creator or an ' +
        'Administrator (DELETE /api/documents/:id)', function (done) {
          chai.request(app)
            .delete('/api/documents/' + doc1id)
            .set('x-access-token', authToken)
            .end(function (err, res) {
              assert.equal(res.status, 403);
              assert.equal(typeof res.body, 'object');
              assert.equal(res.body.message, 'Forbidden to delete this document.');
              done();
            });
        });
    });

  });

});