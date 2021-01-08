const test = require('supertest');
const app = require('../app');

var obj;

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
            .expect(function(res) {
                obj = res.body.token;
            })
            .expect(200)
            .end(
                res => {
                    console.log(obj);
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