import express from 'express';
import passport from 'passport';

import AuthController from '../controllers/auth/AuthController';
import AuthValidator from '../controllers/auth/AuthValidator';
import ExceptionConfig from '../configs/ExceptionConfig';
import ValidatorHandling from '../middlewares/ValidatorHandling';

const router = express.Router()

router.post('/login', ValidatorHandling(AuthValidator.postLogin),
    (req, res, next) => passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            return res.jsonError({
                code: 401,
                message: ExceptionConfig.AUTH.LOGIN_FAIL
            });
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return next();
        });
    })(req, res, next),
    AuthController.post_login);
router.post('/refresh_token', ValidatorHandling(AuthValidator.postRefreshToken), AuthController.post_refreshToken);
router.get('/logout', AuthController.get_logout)

export default router