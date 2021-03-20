process.env.NODE_ENV = "test"

import chai from "chai"
import chaiHttp from "chai-http"

import app from '../../src/app';
import User from '../../src/models/User';

const should = chai.should()

chai.use(chaiHttp)

const token = 'Token string';
/*
|--------------------------------------------------------------------------
| Test /Get routes
|--------------------------------------------------------------------------
*/
describe('/GET /api/v1/users/index', () => {
    it('it should GET all the users', (done) => {
        chai.request(app)
            .get('/api/v1/users/index')
            .set('X-Access-Token', token)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.data.should.not.be.empty;
                done();
            })
    })
})

/*
|--------------------------------------------------------------------------
| Test /Post routes
|--------------------------------------------------------------------------
*/
describe('/POST /api/v1/users/index', () => {
    it('it should not POST data with a registered email', (done) => {
        let params = {
            username: 'John Doe 15',
            password: '12345678',
            email: 'john.doe1@gmail.com',
            staff_no: 'j_doe15',
            position_id: 5,
            organizations: [9]
        }
        chai.request(app)
            .post('/api/v1/users/index')
            .set('X-Access-Token', token)
            .send(params)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(400);
                res.body.errors.should.not.be.empty;
                res.body.should.have.property('status').eql('error');
                done()
            })
    })
    it('it should POST data to create new user', (done) => {
        let params = {
            username: 'John Doe 15',
            password: '12345678',
            email: 'john.doe15@gmail.com',
            staff_no: 'j_doe15',
            position_id: 5,
            organizations: [9]
        }
        chai.request(app)
            .post('/api/v1/users/index')
            .set('X-Access-Token', token)
            .send(params)
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200)
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                done()
            })
    })
})

/*
|--------------------------------------------------------------------------
| Test /Put routes
|--------------------------------------------------------------------------
*/
describe('/PUT /api/v1/users/index/:id', () => {
    it('it should PUT data to update user', (done) => {
        let params = {
            username: 'John Doe 20',
            password: '12345678',
            email: 'john.doe20@gmail.com',
            staff_no: 'j_doe20',
            position_id: 5,
            organizations: [9]
        }
        User.build(params).save().then(item => {
            chai.request(app)
                .put(`/api/v1/users/index/{$item.id}`)
                .set('X-Access-Token', token)
                .send(params)
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    done()
                })
        })
    })
})