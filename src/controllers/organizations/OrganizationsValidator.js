import { check } from 'express-validator';

import ExceptionConfig from '../../configs/ExceptionConfig';
import Organization from '../../models/Organization';

const OrganizationsValidator = {
    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/organizations
    |--------------------------------------------------------------------------
    */
    /* Method: POST */
	postCreateRecord: [
        check('name').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .trim().escape(),
        check('code').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .custom(value => {
                        return Organization.findOne({ attributes: ['id'], where: { code: value } }).then(item => {
                            if(item){
                                return Promise.reject(`Code ${value} already in use`);
                            }
                        });
                    })
                    .trim().escape(),
        check('parent_id').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                          .isInt().withMessage(ExceptionConfig.VALIDATION.INVALID_VALUE)
    ],

    /* Method: PUT */
    putUpdateRecord: [
        check('name').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .trim().escape(),
        check('code').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .custom((value, { req }) => {
                        const pk = req.params.pk;
                        return Organization.findOne({ attributes: ['id'], where: { code: value } }).then(item => {
                            if (item && item.id != pk) {
                                return Promise.reject(`Code ${value} already in use`);
                            }
                        });
                    })
                    .trim().escape(),
        check('parent_id').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .isInt().withMessage(ExceptionConfig.VALIDATION.INVALID_VALUE)
    ]
}

export default OrganizationsValidator;