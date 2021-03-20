import express from "express"


import ValidatorHandling from "../middlewares/ValidatorHandling"

import AuthController from "../controllers/auth/AuthController"
import AuthValidator from "../controllers/auth/AuthValidator"

const router = express.Router()

router.post("/login", ValidatorHandling(AuthValidator.postLogin), AuthController.login)
router.post("/refreshToken", ValidatorHandling(AuthValidator.postRefreshToken), AuthController.refreshToken)

export default router