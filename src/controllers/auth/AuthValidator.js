import { check } from "express-validator"
import ExceptionConfig from "../../configs/ExceptionConfig"

const AuthValidator = {

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/login
    | Method: POST
    |--------------------------------------------------------------------------
    */
	postLogin: [
        check("email")
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
            .isEmail().withMessage(ExceptionConfig.VALIDATION.INVALID_EMAIL),
        check("password")
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
    ],

    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/auth/refreshToken
    | Method: POST
    |--------------------------------------------------------------------------
    */
    postRefreshToken: [
        check("refreshToken")
            .exists().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD),
    ]
}

export default AuthValidator