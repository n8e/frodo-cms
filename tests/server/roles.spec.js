var url = 'http://localhost:3000',
  request = require('superagent');

describe('Roles', function() {
  it('validates that the seeded roles are stored in database', function(done) {
    request
      .get(url + '/api/users/roles')
      .end(function(err, res) {
        // expected responses after seeding
        expect(res.status).toBe(200);
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
      });
  });

  it('validates that a new role created has a unique title', function(done) {
    request
      .post(url + '/api/users/roles')
      .send({
        id: 1,
        title: 'Administrator'
      })
      .end(function(err, res) {
        expect(res.status).toEqual(409);
        expect(res.body.code).toEqual(11000);
        expect(res.body.index).toEqual(0);
        expect(res.body.errmsg).toContain('E11000 duplicate key error');
        done();
      });
  });
});
