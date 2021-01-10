const test = require('supertest');
const app = require('../app');

var token;

/**
 * testing all endpoint
 */
describe('POST /management/api/login', () => {
    it('respond with 201', done => {
        const user = {
            EMAIL: "aamardach@gmail.com",
            PASSWORD: "ironDrone"
        }
        test(app)
            .post('/management/api/login')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            /*.expect(function(req) {
                token = req.body.token;
            })*/
            .expect(200)
            .end(
                res => {
                    if (res) return done(res);
                    done();
                },
                error => {
                    if (error) return done(error);
                    done();
                }
            )
    })
});

/*describe('GET /management/api/all/users', () => {
    it('respond with 201', done => {
        test(app)
            .get('/management/api/all/users')
            .set('Accept', 'application/json')
            //.set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
});*/