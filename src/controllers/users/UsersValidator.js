import { check } from 'express-validator';

import ExceptionConfig from '../../configs/ExceptionConfig';
import User from '../../models/User';

const UsersValidator = {
    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/users
    |--------------------------------------------------------------------------
    */
    /* Method: POST */
	postCreateRecord: [
        check('username').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                        .trim().escape(),
        check('password').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                        .isLength({ min: 8 }).withMessage("Password must be at least 8 chars long"),
        check('email').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .isEmail().withMessage(ExceptionConfig.VALIDATION.INVALID_EMAIL)
                    .custom(value => {
                        return User.findOne({ attributes: ['id'], where: { email: value } }).then(item => {
                            if(item){
                                return Promise.reject(`Email ${value} is already registered`);
                            }
                        });
                    }),
        check('staff_no').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .custom(value => {
                        return User.findOne({ attributes: ['id'], where: { staff_no: value } }).then(item => {
                            if(item){
                                return Promise.reject(`Staff no ${value} already in use`);
                            }
                        });
                    })
                    .trim().escape()
    ],
    /* Method: PUT */
    putUpdateRecord: [
        check('username').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                        .trim().escape(),
        check('password').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                        .isLength({ min: 8 }).withMessage("Password must be at least 8 chars long"),
        check('email').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .isEmail().withMessage(ExceptionConfig.VALIDATION.INVALID_EMAIL)
                    .custom((value, { req }) => {
                        const pk = req.params.pk;
                        return User.findOne({ attributes: ['id'], where: { email: value } }).then(item => {
                            if(item && item.id != pk){
                                return Promise.reject(`Email ${value} is already registered`);
                            }
                        });
                    }),
        check('staff_no').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .custom((value, { req }) => {
                        const pk = req.params.pk;
                        return User.findOne({ attributes: ['id'], where: { staff_no: value } }).then(item => {
                            if(item && item.id != pk){
                                return Promise.reject(`Staff no ${value} already in use`);
                            }
                        });
                    })
                    .trim().escape()
    ]
}

export default UsersValidator;