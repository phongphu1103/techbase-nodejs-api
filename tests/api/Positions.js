process.env.NODE_ENV = "test"

import chai from "chai"
import chaiHttp from "chai-http"

import app from "../../src/app"

const should = chai.should()

chai.use(chaiHttp)


/*
|--------------------------------------------------------------------------
| Test /Get routes
|--------------------------------------------------------------------------
*/
describe('/GET /api/v1/positions/index', () => {
    it('it should GET all the positions', (done) => {
        chai.request(app)
            .get('/api/v1/positions')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.data.should.not.be.empty
                done()
            })
    })
})

/*
|--------------------------------------------------------------------------
| Test /Post routes
|--------------------------------------------------------------------------
*/
describe('/POST /api/v1/positions/index', () => {
    it('it should POST data to create new position', (done) => {
        chai.request(app)
            .get('/api/v1/positions')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.data.should.not.be.empty
                done()
            })
    })
})

/*
|--------------------------------------------------------------------------
| Test /Put routes
|--------------------------------------------------------------------------
*/
describe('/PUT /api/v1/positions', () => {
    it('it should PUT data to update position', (done) => {
        chai.request(app)
            .get('/api/v1/users')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.data.should.not.be.empty
                done()
            })
    })
})