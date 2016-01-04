var url = 'http://localhost:3000',
  request = require('superagent');

describe('Users', function() {
  it('should show that a new user is created ' +
    '(POST /api/users)',
    function(done) {
      request
        .post(url + '/api/users')
        .send({
          username: 'batman',
          firstname: 'Bruce',
          lastname: 'Wayne',
          email: 'batman@cave.com',
          password: '12345',
          role: 2
        })
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(typeof res.body).toBe('object');
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe('User has been created!');
          done();
        });
    });

  it('validates that the new user created is unique ' +
    '(POST /api/users)',
    function(done) {
      request
        .post(url + '/api/users')
        .send({
          username: 'batman',
          firstname: 'Bruce',
          lastname: 'Wayne',
          email: 'batman@cave.com',
          password: '12345',
          role: 2
        })
        .end(function(err, res) {
          expect(res.status).toEqual(403);
          expect(typeof res.body).toBe('object');
          expect(res.body.code).toEqual(11000);
          expect(res.body.errmsg).toContain('E11000 duplicate key error index');
          expect(res.body.index).toEqual(0);
          done();
        });
    });

  it('validates that all users are returned when getAllUsers ' +
    'function in the controller is called (GET /api/users)',
    function(done) {
      request
        .get(url + '/api/users')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
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
    function(done) {
      request
        .get(url + '/api/users')
        .end(function(err, res) {
          expect(res.status).toEqual(200);
          expect(res.body[res.body.length - 1].role).toEqual('User');
          expect(res.body[res.body.length - 1].name.first).toEqual('Bruce');
          expect(res.body[res.body.length - 1].name.last).toEqual('Wayne');
          done();
        });
    });

  it('validates that a valid user can be logged in', function(done) {
    request
      .post(url + '/api/users/login')
      .send({
        username: 'smalik',
        password: '12345'
      })
      .end(function(err, res) {
        expect(res.status).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Successfully logged in!');
        expect(res.body.token).toBeDefined();
        done();
      });
  });

  it('validates that an invalid user cannot be logged in', function(done) {
    request
      .post(url + '/api/users/login')
      .send({
        username: 'rupertm',
        password: '67891'
      })
      .end(function(err, res) {
        expect(res.status).toEqual(500);
        expect(res.body.message).toBe('User doesnt exist');
        done();
      });
  });
});
