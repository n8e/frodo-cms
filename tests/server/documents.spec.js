var url = 'http://localhost:3000',
  request = require('superagent'),
  moment = require('moment'),
  user = {
    username: 'smalik',
    password: '12345'
  },
  authToken, userId;
var document1 = {
    title: 'Area of Triangle',
    content: 'This is obtained from the base and height. Get half of' +
      ' the base and multiply by the height to get the area.'
  },
  doc1id,
  document2 = {
    title: 'Cone',
    content: 'Has a circular base and a pointed top. It is a third of a ' +
      'cylinder'
  },
  doc2id,
  document3 = {
    title: 'Perimeter of Rectangle',
    content: 'Obtained by summing the length and width and doubling the result.'
  },
  doc3id,
  document4 = {
    title: 'Cylinder',
    content: 'Volume obtained using area of base multiplied by the height.'
  },
  doc4id;

describe('Document', function() {
  it('validates that one has to be authenticated to access documents ' +
    '(GET /api/documents)',
    function(done) {
      request
        .get(url + '/api/documents')
        .end(function(err, res) {
          expect(typeof res.body).toBe('object');
          expect(res.status).toEqual(403);
          expect(res.body.success).toEqual(false);
          expect(res.body.message).toBe('No token provided!');
          done();
        });
    });
});

describe('Document tests requiring authentication', function() {
  // perform login function first
  beforeEach(function login(done) {
    request
      .post(url + '/api/users/login')
      .send(user)
      .end(function(err, res) {
        userId = res.body.id;
        authToken = res.body.token;
        done();
      });
  });

  it('validates that a document is created by a user logged in ' +
    '(POST /api/documents)',
    function(done) {
      request
        .post(url + '/api/documents')
        .set('x-access-token', authToken)
        .send(document1)
        .end(function(err, res) {
          doc1id = res.body._id;
          expect(res.status).toEqual(200);
          expect(typeof res.body).toBe('object');
          expect(res.body._id).toBeDefined();
          expect(res.body.title).toEqual(document1.title);
          expect(res.body.content).toBe(document1.content);
          done();
        });
    });

  it('validates that a document is created by a user logged in ' +
    '(POST /api/documents)',
    function(done) {
      request
        .post(url + '/api/documents')
        .set('x-access-token', authToken)
        .send(document2)
        .end(function(err, res) {
          doc2id = res.body._id;
          expect(res.status).toEqual(200);
          expect(typeof res.body).toBe('object');
          expect(res.body._id).toBeDefined();
          expect(res.body.title).toEqual(document2.title);
          expect(res.body.content).toBe(document2.content);
          done();
        });
    });

  it('validates that one has to be authenticated to access documents ' +
    '(GET /api/documents)',
    function(done) {
      request
        .get(url + '/api/documents')
        .set('x-access-token', authToken)
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(typeof res.body).toBe('object');
          expect(res.body.length).toBeGreaterThan(0);
          expect(res.body[res.body.length - 1].title).toEqual(document2.title);
          expect(res.body[res.body.length - 1].content).toEqual(document2
            .content);
          done();
        });
    });

  it('validates that all documents, limited by a specified number ' +
    'and ordered by published date, that can be accessed by a ' +
    'role USER, are returned when getAllDocumentsByRoleUser is called',
    function(done) {
      request
        .get(url + '/api/documents/user')
        .set('x-access-token', authToken)
        .end(function(err, res) {
          var itemOne = res.body[0];
          var itemLast = res.body[res.body.length - 1];
          expect(res.status).toEqual(200);
          expect(itemLast.dateCreated).toEqual(itemOne.dateCreated);
          done();
        });
    });

  it('validates that all documents, limited by a specified number, that were' +
    ' published on a certain date, are returned when getAllDocumentsByDate ' +
    'is called',
    function(done) {
      request
        .get(url + '/api/documents/date')
        .set('x-access-token', authToken)
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body.length).toBeGreaterThan(1);
          expect(res.body[0].dateCreated).toContain(moment(new Date())
            .format('YYYY-MM-DD'));
          expect(true).toBe(true);
          done();
        });
    });
});

// tests for administrator documents
describe('Administrator Documents', function() {
  beforeEach(function logout(done) {
    request
      .get('http://localhost:3000/api/users/logout')
      .set('x-access-token', authToken)
      .end(function() {
        authToken = '';
        done();
      });
  });

  // login the administrator
  beforeEach(function loginAdmin(done) {
    request
      .post(url + '/api/users/login')
      .send({
        username: 'Sonnie',
        password: '12345'
      })
      .end(function(err, res) {
        userId = res.body.id;
        authToken = res.body.token;
        done();
      });
  });

  it('validates that a document is created by a admin logged in ' +
    '(POST /api/documents)',
    function(done) {
      request
        .post(url + '/api/documents')
        .set('x-access-token', authToken)
        .send(document3)
        .end(function(err, res) {
          doc3id = res.body._id;
          expect(res.status).toEqual(200);
          expect('Content-Type', 'json', done);
          expect(typeof res.body).toBe('object');
          expect(res.body._id).toBeDefined();
          expect(res.body.title).toEqual(document3.title);
          expect(res.body.content).toBe(document3.content);
          done();
        });
    });

  it('validates that a document is created by a admin logged in ' +
    '(POST /api/documents)',
    function(done) {
      request
        .post(url + '/api/documents')
        .set('x-access-token', authToken)
        .send(document4)
        .end(function(err, res) {
          doc4id = res.body._id;
          expect(res.status).toEqual(200);
          expect(typeof res.body).toBe('object');
          expect(res.body._id).toBeDefined();
          expect(res.body.title).toEqual(document4.title);
          expect(res.body.content).toBe(document4.content);
          done();
        });
    });

  it('validates that all documents, limited by a specified number ' +
    'and ordered by published date, that can be accessed by a role ' +
    'ADMINISTRATOR, are returned when ' +
    'getAllDocumentsByRoleAdministrator is called',
    function(done) {
      request
        .get(url + '/api/documents/admin')
        .set('x-access-token', authToken)
        .end(function(err, res) {
          var lastItem = res.body[res.body.length - 1];
          var firstItem = res.body[res.body.length - 2];
          expect(res.status).toEqual(200);
          expect(lastItem.dateCreated).toEqual(firstItem.dateCreated);
          expect(true).toBe(true);
          done();
        });
    });

  it('validates that any users document can be updated by an ' +
    'Administrator (PUT /api/documents)/:id',
    function(done) {
      request
        .put(url + '/api/documents/' + doc1id)
        .set('x-access-token', authToken)
        .send({
          title: 'Frodo',
          content: 'A character in LOTR.'
        })
        .end(function(err, res) {
          expect(res.status).toBe(200);
          expect(typeof res.body).toEqual('object');
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('Successfully updated Document!');
          done();
        });
    });

  it('validates that any users document can be deleted by an ' +
    'Administrator (DELETE /api/documents)/:id',
    function(done) {
      request
        .del(url + '/api/documents/' + doc2id)
        .set('x-access-token', authToken)
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(typeof res.body).toBe('object');
          expect(res.body.message.title).toBe(document2.title);
          expect(res.body.message.content).toBe(document2.content);
          done();
        });
    });
});
// tests for manipulating documents access
describe('Document tests requiring authentication', function() {
  // logout first
  beforeEach(function logout(done) {
    request
      .get('http://localhost:3000/api/users/logout')
      .set('x-access-token', authToken)
      .end(function() {
        authToken = '';
        done();
      });
  });

  // perform login function first
  beforeEach(function login(done) {
    request
      .post(url + '/api/users/login')
      .send({
        username: 'tn',
        password: '12345'
      })
      .end(function(err, res) {
        userId = res.body.id;
        authToken = res.body.token;
        done();
      });
  });

  it('validates that a document can only be updated by the creator or an ' +
    'Administrator (PUT /api/documents/:id)',
    function(done) {
      request
        .put(url + '/api/documents/' + doc1id)
        .set('x-access-token', authToken)
        .send({
          title: 'Frodo',
          content: 'A character in LOTR.'
        })
        .end(function(err, res) {
          expect(res.status).toBe(403);
          expect(typeof res.body).toBe('object');
          expect(res.body.message).toBe('Forbidden to update this document.');
          done();
        });
    });

  it('validates that a document can only be deleted by the creator or an ' +
    'Administrator (DELETE /api/documents/:id)',
    function(done) {
      request
        .del(url + '/api/documents/' + doc1id)
        .set('x-access-token', authToken)
        .end(function(err, res) {
          expect(res.status).toEqual(403);
          expect(typeof res.body).toBe('object');
          expect(res.body.message).toBe('Forbidden to delete this document.');
          done();
        });
    });
});
