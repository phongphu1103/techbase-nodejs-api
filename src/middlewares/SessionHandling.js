import session from "express-session";
import SequelizeStore from 'connect-session-sequelize';
// import connectMongo from "connect-mongo"

// import MongoDb from "../databases/MongoDb"
import MariaDb from '../databases/MariaDb';
import Session from "../utils/Session"
import SessionConfig from "../configs/SessionConfig"


// const MongoStore = connectMongo(session)
const dbConnection = MariaDb.getConnect();
// console.log(dbConnection)
// const store = new SequelizeStore({
//     db: dbConnection,
// })

const SessionMiddleware = session({
    secret: SessionConfig.SESSION_SECRET_KEY,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    // store: new MongoStore({
    //     url: MongoDb.getUri(),
    //     mongoOptions: MongoDb.getOptions(),
    // }),

    // store: store,
    cookie: { maxAge: SessionConfig.SESSION_MAX_AGE },
})

const SessionHandling = (req, res, next) => {
    Session.instance(req.session)
    next()
}


export default SessionMiddleware
export {
    SessionHandling
}