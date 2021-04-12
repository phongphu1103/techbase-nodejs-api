import express from 'express';

import AuthController from '../controllers/auth/AuthController';
import AuthValidator from '../controllers/auth/AuthValidator';
import ValidatorHandling from '../middlewares/ValidatorHandling';

const router = express.Router()

router.post('/login', ValidatorHandling(AuthValidator.postLogin), AuthController.login)
router.post('/refresh_token', ValidatorHandling(AuthValidator.postRefreshToken), AuthController.refreshToken)

export default router