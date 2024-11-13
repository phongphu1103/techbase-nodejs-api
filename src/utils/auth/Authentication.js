import jwt from 'jsonwebtoken';

import AuthConfig from '../../configs/AuthConfig';

class Authentication {
    constructor() {}

    // create a jwt token containing the user info that expires in 15 minutes
    getToken(payload) {
        const options = {
            algorithm: 'HS256',
            expiresIn: AuthConfig.TOKEN_LIFE
        }
        return jwt.sign(payload || {}, AuthConfig.TOKEN_SECRET_KEY, options)
    }

    getRefreshToken(payload) {
        const options = {
            expiresIn: AuthConfig.REFRESH_TOKEN_LIFE
        }
        return jwt.sign(payload || {}, AuthConfig.REFRESH_TOKEN_SECRET_KEY, options)
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, AuthConfig.TOKEN_SECRET_KEY)
        } catch (err) {
            return false
        }
    }

    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, AuthConfig.REFRESH_TOKEN_SECRET_KEY)
        } catch (err) {
            return false
        }
    }
}

export default new Authentication()