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
            .expect(200)
            .end(
                error => {
                    if (error) return done(error);
                    else done();
                })
    })
})