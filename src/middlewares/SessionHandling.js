import session from 'express-session';
import connectMongo from 'connect-mongo'
import connectRedis from 'connect-redis';
import connectSessionSequelize from 'connect-session-sequelize';
// import MongoDb from '../databases/MongoDb'
import MariaDb from '../databases/MariaDb';
import RedisClient, { isRedisAvailable } from '../databases/RedisClient';
import Session from '../utils/Session';
import SessionConfig from '../configs/SessionConfig';

const SequelizeStore = connectSessionSequelize(session.Store);
const RedisStore = connectRedis(session)
const MongoStore = connectMongo(session)

const sequelize = MariaDb.getConnection();
const sequelizeStore = new SequelizeStore({
    db: sequelize,
});
// make sure that Session tables are in place
sequelizeStore.sync();

const redisStore = new RedisStore({
    client: RedisClient,
    ttl: 86400
})

const SessionMiddleware = session({
    secret: SessionConfig.SESSION_SECRET_KEY,
    cookie: { maxAge: SessionConfig.SESSION_MAX_AGE },
    saveUninitialized: false, // don't create session until something stored
    resave: false, //don't save session if unmodified
    // store: new MongoStore({
    //     url: MongoDb.getUri(),
    //     mongoOptions: MongoDb.getOptions(),
    // }),
    store: isRedisAvailable() ? redisStore : sequelizeStore
});

const SessionHandling = (req, res, next) => {
    Session.instance(req.session);
    next();
};

export default SessionMiddleware
export {
    SessionHandling
}