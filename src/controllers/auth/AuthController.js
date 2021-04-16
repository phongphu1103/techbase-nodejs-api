import ExceptionConfig from '../../configs/ExceptionConfig'
import Authentication from '../../utils/auth/Authentication'
import Session from '../../utils/Session'

class AuthController {
    async post_login (req, res, next) {
        try {
            const user = req.user;
            // authentication successful so generate jwt and refresh tokens
            const payload = {
                id: user.id,
                username: user.username,
                email: user.email
            }
            const token = Authentication.getToken(payload);
            const refresh_token = Authentication.getRefreshToken(payload);
            // Session.set('token', token);
            // Session.set('refresh_token', refresh_token);
            // Session.set('user', user);
            // return basic details and tokens
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: {
                    token: token,
                    refresh_token: refresh_token
                }
            });
        } catch(err) {
            next(err)
        }
    }

    post_refreshToken (req, res, next) {
        try {
            const current_refresh_token = Session.get('refresh_token');
            const user = Authentication.verifyRefreshToken(current_refresh_token);
            if(user){
                const payload = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
                // replace old refresh token with a new one and save
                const refresh_token = Authentication.getRefreshToken(payload);
                // generate new jwt
                const token = Authentication.getToken(payload);
                Session.set('token', token);
                Session.set('refresh_token', refresh_token);
                return res.jsonSuccess({
                    message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                    data: {
                        token: token,
                        refresh_token: refresh_token
                    }
                });
            }else{
                return res.jsonError({
                    code: 401,
                })
            }
        } catch(err) {
            next(err)
        }
    }

    get_logout(req, res, next) {
        try{
            req.logout()
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS
            });
        } catch(err) {
            next(err)
        }
    }
}

export default new AuthController()