import session from "express-session";
// import connectMongo from "connect-mongo"

// import MongoDb from "../databases/MongoDb"
import MariaDb from '../databases/MariaDb';
import Session from "../utils/Session"
import SessionConfig from "../configs/SessionConfig"

const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const MongoStore = connectMongo(session)
const db = MariaDb.connect();
const store = new SequelizeStore({
    db: db,
});
// make sure that Session tables are in place
store.sync();

const SessionMiddleware = session({
    secret: SessionConfig.SESSION_SECRET_KEY,
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    // store: new MongoStore({
    //     url: MongoDb.getUri(),
    //     mongoOptions: MongoDb.getOptions(),
    // }),
    store: store,
    cookie: { maxAge: SessionConfig.SESSION_MAX_AGE },
});

const SessionHandling = (req, res, next) => {
    Session.instance(req.session);
    next();
};


export default SessionMiddleware
export {
    SessionHandling
}