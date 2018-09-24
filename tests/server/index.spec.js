var mongoose = require('mongoose'),
  request = require('supertest'),
  moment = require('moment'),
  app = require('../../index'),
  documentHelper = require('./helpers/documentHelper');

describe('SERVER Tests', function () {

  afterAll(function () {
    return mongoose.connection.close();
  });

  describe('Roles:', function () {

    it('validates that the seeded roles are stored in database', function (done) {
      request(app)
        .get('/api/users/roles')
        .expect(200)
        .end(function (err, res) {
          // expected responses after seeding
          expect(res.body.length).toEqual(2);
          if (res.body[0].id === 1) {
            expect(res.body[0].title).toEqual('Administrator');
          } else if (res.body[0].id === 2) {
            expect(res.body[0].title).toEqual('User');
          } else if (res.body[1].id === 1) {
            expect(res.body[1].title).toEqual('Administrator');
          } else if (res.body[1].id === 2) {
            expect(res.body[1].title).toEqual('User');
          }
          done();
        })
    });

    it('validates that a new role created has a unique title', function (done) {
      request(app)
        .post('/api/users/roles')
        .send({
          id: 1,
          title: 'Administrator'
        })
        .expect(409)
        .end(function (err, res) {
          expect(res.body.code).toEqual(11000);
          expect(res.body.index).toEqual(0);
          expect(res.body.errmsg).toContain('E11000 duplicate key error index');
          done();
        });
    });
  });

  describe('Users:', function () {

    it('should show that a new user is created ' +
      '(POST /api/users)',
      function (done) {
        request(app)
          .post('/api/users')
          .send({
            username: 'batman',
            firstname: 'Bruce',
            lastname: 'Wayne',
            email: 'batman@cave.com',
            password: '12345',
            role: 2
          })
          .expect(200)
          .end(function (err, res) {
            expect(typeof res.body).toBe('object');
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe('User has been created!');
            done();
          });
      });

    it('validates that the new user created is unique ' +
      '(POST /api/users)',
      function (done) {
        request(app)
          .post('/api/users')
          .send({
            username: 'batman',
            firstname: 'Bruce',
            lastname: 'Wayne',
            email: 'batman@cave.com',
            password: '12345',
            role: 2
          })
          .expect(403)
          .end(function (err, res) {
            expect(typeof res.body).toBe('object');
            expect(res.body.code).toEqual(11000);
            expect(res.body.index).toEqual(0);
            done();
          });
      });

    it('validates that all users are returned when getAllUsers ' +
      'function in the controller is called (GET /api/users)',
      function (done) {
        request(app)
          .get('/api/users')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function (err, res) {
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[res.body.length - 1].username).toEqual('batman');
            expect(res.body[res.body.length - 1].email)
              .toEqual('batman@cave.com');
            expect(typeof res.body).toBe('object');
            done();
          });
      });

    it('validates that the new user created has a defined role, ' +
      'has a first name and a last name',
      function (done) {
        request(app)
          .get('/api/users')
          .expect(200)
          .end(function (err, res) {
            expect(res.body[res.body.length - 1].role).toEqual('User');
            expect(res.body[res.body.length - 1].name.first).toEqual('Bruce');
            expect(res.body[res.body.length - 1].name.last).toEqual('Wayne');
            done();
          });
      });

    it('validates that a valid user can be logged in', function (done) {
      request(app)
        .post('/api/users/login')
        .send({
          username: 'smalik',
          password: '12345'
        })
        .expect(200)
        .end(function (err, res) {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('Successfully logged in!');
          expect(res.body.token).toBeDefined();
          done();
        });
    });

    it('validates that an invalid user cannot be logged in', function (done) {
      request(app)
        .post('/api/users/login')
        .send({
          username: 'rupertm',
          password: '67891'
        })
        .expect(401)
        .end(function (err, res) {
          expect(res.body.message).toBe('User does not exist');
          done();
        });
    });
  });

  describe('Documents:', function () {

    var authToken, userId, doc1id, doc2id, doc3id, doc4id;

    describe('Document', function () {
      it('validates that one has to be authenticated to access documents ' +
        '(GET /api/documents)',
        function (done) {
          request(app)
            .get('/api/documents')
            .expect(403)
            .then(function (err, res) {
              var response = JSON.parse(err.text);

              expect(response.success).toEqual(false);
              expect(response.message).toBe('No token provided!');
              done();
            });
        });
    });

    describe('Document tests requiring authentication', function () {
      // perform login function first
      beforeEach(function login(done) {
        request(app)
          .post('/api/users/login')
          .send(documentHelper.user)
          .then(function (res) {
            userId = res.body.id;
            authToken = res.body.token;
            done();
          });
      });

      it('validates that a document is created by a user logged in ' +
        '(POST /api/documents)',
        function (done) {
          request(app)
            .post('/api/documents')
            .set('x-access-token', authToken)
            .send(documentHelper.document1)
            .expect(200)
            .end(function (err, res) {
              doc1id = res.body.document._id;
              expect(typeof res.body.document).toBe('object');
              expect(res.body.document._id).toBeDefined();
              expect(res.body.document.title).toEqual(documentHelper.document1.title);
              expect(res.body.document.content).toBe(documentHelper.document1.content);
              done();
            });
        });

      it('validates that a document is created by a user logged in ' +
        '(POST /api/documents)',
        function (done) {
          request(app)
            .post('/api/documents')
            .set('x-access-token', authToken)
            .send(documentHelper.document2)
            .expect(200)
            .end(function (err, res) {
              doc2id = res.body.document._id;
              expect(typeof res.body.document).toBe('object');
              expect(res.body.document._id).toBeDefined();
              expect(res.body.document.title).toEqual(documentHelper.document2.title);
              expect(res.body.document.content).toBe(documentHelper.document2.content);
              done();
            });
        });

      it('validates that one has to be authenticated to access documents ' +
        '(GET /api/documents)',
        function (done) {
          request(app)
            .get('/api/documents')
            .set('x-access-token', authToken)
            .expect(200)
            .end(function (err, res) {
              expect(typeof res.body).toBe('object');
              expect(res.body.length).toBeGreaterThan(0);
              expect(res.body[res.body.length - 1].title).toEqual(documentHelper.document2.title);
              expect(res.body[res.body.length - 1].content).toEqual(documentHelper.document2
                .content);
              done();
            });
        });

      it('validates that all documents, limited by a specified number ' +
        'and ordered by published date, that can be accessed by a ' +
        'role USER, are returned when getAllDocumentsByRoleUser is called',
        function (done) {
          request(app)
            .get('/api/documents/user')
            .set('x-access-token', authToken)
            .expect(200)
            .end(function (err, res) {
              var itemOne = res.body[0];
              var itemLast = res.body[res.body.length - 2];
              expect(itemLast.dateCreated).toEqual(itemOne.dateCreated);
              done();
            });
        });

      it('validates that all documents, limited by a specified number, that were' +
        ' published on a certain date, are returned when getAllDocumentsByDate ' +
        'is called',
        function (done) {
          request(app)
            .get('/api/documents/date')
            .set('x-access-token', authToken)
            .expect(200)
            .end(function (err, res) {
              expect(res.body.length).toBeGreaterThan(1);
              expect(res.body[0].dateCreated).toContain(moment(new Date())
                .format('YYYY-MM-DD'));
              done();
            });
        });
    });

    // tests for administrator documents
    describe('Administrator Documents', function () {
      beforeEach(function logout(done) {
        request(app)
          .get('/api/users/logout')
          .set('x-access-token', authToken)
          .end(function () {
            authToken = '';
            done();
          });
      });

      // login the administrator
      beforeEach(function loginAdmin(done) {
        request(app)
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
        '(POST /api/documents)',
        function (done) {
          request(app)
            .post('/api/documents')
            .set('x-access-token', authToken)
            .send(documentHelper.document3)
            .expect(200)
            .end(function (err, res) {
              doc3id = res.body.document._id;
              expect('Content-Type', 'json', done);
              expect(typeof res.body.document).toBe('object');
              expect(res.body.document._id).toBeDefined();
              expect(res.body.document.title).toEqual(documentHelper.document3.title);
              expect(res.body.document.content).toBe(documentHelper.document3.content);
              done();
            });
        });

      it('validates that a document is created by a admin logged in ' +
        '(POST /api/documents)',
        function (done) {
          request(app)
            .post('/api/documents')
            .set('x-access-token', authToken)
            .send(documentHelper.document4)
            .expect(200)
            .end(function (err, res) {
              doc4id = res.body.document._id;
              expect(typeof res.body.document).toBe('object');
              expect(res.body.document._id).toBeDefined();
              expect(res.body.document.title).toEqual(documentHelper.document4.title);
              expect(res.body.document.content).toBe(documentHelper.document4.content);
              done();
            });
        });

      it('validates that all documents, limited by a specified number ' +
        'and ordered by published date, that can be accessed by a role ' +
        'ADMINISTRATOR, are returned when ' +
        'getAllDocumentsByRoleAdministrator is called',
        function (done) {
          request(app)
            .get('/api/documents/admin')
            .set('x-access-token', authToken)
            .expect(200)
            .end(function (err, res) {
              var lastItem = res.body[res.body.length - 1];
              var firstItem = res.body[res.body.length - 2];
              expect(lastItem.dateCreated).toEqual(firstItem.dateCreated);
              expect(true).toBe(true);
              done();
            });
        });

      it('validates that any users document can be updated by an ' +
        'Administrator (PUT /api/documents)/:id',
        function (done) {
          request(app)
            .put('/api/documents/' + doc1id)
            .set('x-access-token', authToken)
            .send({
              title: 'Frodo',
              content: 'A character in LOTR.'
            })
            .expect(200)
            .end(function (err, res) {
              expect(typeof res.body).toEqual('object');
              expect(res.body.success).toBe(true);
              expect(res.body.message).toBe('Successfully updated Document!');
              done();
            });
        });

      it('validates that any users document can be deleted by an ' +
        'Administrator (DELETE /api/documents)/:id',
        function (done) {
          request(app)
            .delete('/api/documents/' + doc2id)
            .set('x-access-token', authToken)
            .expect(200)
            .end(function (err, res) {
              expect(typeof res.body).toBe('object');
              expect(res.body.message.title).toBe(documentHelper.document2.title);
              expect(res.body.message.content).toBe(documentHelper.document2.content);
              done();
            });
        });
    });

    // tests for manipulating documents access
    describe('Document tests requiring authentication', function () {
      // logout first
      beforeEach(function logout(done) {
        request(app)
          .get('/api/users/logout')
          .set('x-access-token', authToken)
          .end(function () {
            authToken = '';
            done();
          });
      });

      // perform login function first
      beforeEach(function login(done) {
        request(app)
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
        'Administrator (PUT /api/documents/:id)',
        function (done) {
          request(app)
            .put('/api/documents/' + doc1id)
            .set('x-access-token', authToken)
            .send({
              title: 'Frodo',
              content: 'A character in LOTR.'
            })
            .expect(403)
            .end(function (err, res) {
              expect(typeof res.body).toBe('object');
              expect(res.body.message).toBe('Forbidden to update this document.');
              done();
            });
        });

      it('validates that a document can only be deleted by the creator or an ' +
        'Administrator (DELETE /api/documents/:id)',
        function (done) {
          request(app)
            .delete('/api/documents/' + doc1id)
            .set('x-access-token', authToken)
            .expect(403)
            .end(function (err, res) {
              expect(typeof res.body).toBe('object');
              expect(res.body.message).toBe('Forbidden to delete this document.');
              done();
            });
        });
    });

  });

});