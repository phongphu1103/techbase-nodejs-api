import ExceptionConfig from '../configs/ExceptionConfig'
import AuthConfig from '../configs/AuthConfig'
import Authentication from '../utils/auth/Authentication'
import Session from '../utils/Session'

export default (req, res, next) => {
    // Skip authentication
    if (AuthConfig.AUTH_ENABLE === false)
        return next() // pass control to the next handler

    const token = req.headers['x-access-token'];
    console.log(token)
    // token && req.session
    if (token) {
        // verifies secret and checks exp
        if (Authentication.verifyToken(token)) {
            return next()
        }

        return res.jsonError({
            code: 401,
            message: ExceptionConfig.AUTH.UNAUTHORIZED
        })
    }

    return res.jsonError({
        code: 403,
        message: ExceptionConfig.AUTH.MISSING_TOKEN
    })
    
}
