// Define Dependencies
import express from 'express'
// import socketIO from 'socket.io'
// import http from 'http'
import cors from 'cors'
import compression from 'compression'
import passport from 'passport'
// import morgan from "morgan"

import AppConfig from "./configs/AppConfig"
// import MongoDb from "./databases/MongoDb"

import ErrorHandling from "./middlewares/ErrorHandling"
import LoggerTrackingHandling from "./middlewares/LoggerTrackingHandling"
import ResponseHandling from "./middlewares/ResponseHandling"
import SessionMiddleware, { SessionHandling } from "./middlewares/SessionHandling"
// Import file routes config
import Routes from "./routes/Routes"
const local = require('./strategies/local');

// Create Express App
const app = express()

// Define Middlewares
// if (process.env.NODE_ENV !== "test") app.use(morgan("combined"))

app.use(cors())
    .use(compression())
    .use(express.json()) // for parsing application/json
    // .use(cookieParser()) //cookie-parser for reading cookies from request
    .use(express.urlencoded({ extended: true }))
    .use(SessionMiddleware)
    .use(SessionHandling)
    .use(LoggerTrackingHandling)
    .use(ResponseHandling)
    // passport middleware
    .use(passport.initialize())
    .use(passport.session())

// Define Routes
app.use(Routes)

app.use((req, res, next) => {
    res.jsonError({
        code: 404,
        message: "Page Not Found"
    })
    next()
})
// Error Handling Middleware
app.use(ErrorHandling)

app.listen(AppConfig.API_SERVER_PORT, _ => {
    if(process.env.NODE_ENV !== "test") console.log(`|>>>>>>>>>>>>>>>>>>>>>>> Server is listening on port: ${AppConfig.API_SERVER_PORT}`)

    // Initialize mongoose
    // MongoDb.connectDb()
    // SocketIO.emit("get_user", "test")
})

export default app;
