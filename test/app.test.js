const test = require('supertest');
const app = require('../app');

var id, token;

/**
 * testing all endpoint
 */
describe('POST´s /management/api', () => {
    const user = {
        NOMBRE: "juan",
        APELLIDO: "Pérez",
        USUARIO: "jptest",
        EMAIL: "jp@email.com",
        PASSWORD: "jptest123",
        ID_ROL_USUARIO: 1
    }
    it('respond with 201 for /management/api/new/user', done => {
        test(app)
            .post('/management/api/new/user')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(req) {
                id = req.body.user.ID;
            })
            .expect(201)
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
    });

    it('respond with 201 for /management/api/login', done => {
        test(app)
            .post('/management/api/login')
            .send(user)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(req) {
                token = req.body.token;
            })
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

describe('GET/DELETE /management/api', () => {
    it('respond with 201 for all/users', done => {
        test(app)
            .get('/management/api/all/users')
            .set('Accept', 'application/json')
            .set('x-access-token', token)
            .expect('Content-Type', /json/)
            .expect(200, done)
    });

    it('respond with 201 for delete/user/:id', done => {
        test(app)
            .delete(`/management/api/delete/user/${id}`)
            .set('Accept', 'application/json')
            .expect(200, done)
    });
});