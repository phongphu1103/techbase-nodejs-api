import { check } from 'express-validator';

import ExceptionConfig from '../../configs/ExceptionConfig';
import Position from '../../models/Position';

const PositionsValidator = {
    /*
    |--------------------------------------------------------------------------
    | Routes /api/v1/positions
    |--------------------------------------------------------------------------
    */
    /* Method: POST */
	postCreateRecord: [
        check('name').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .trim().escape(),
        check('code').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .custom(value => {
                        return Position.findOne({ attributes: ['id'], where: { code: value } }).then(item => {
                            if (item) {
                                return Promise.reject(`Code ${value} already in use`);
                            }
                        });
                    })
                    .trim().escape()
        //     .isLength({ min: 5 }).withMessage("must be at least 5 chars long")
        //     .isEmail().withMessage("have to email"),
        // check("sub_email")
        //     .isLength({ min: 5 }).withMessage("must be at least 5 chars long")
        //     .isEmail().withMessage("have to email"),
    ],

    /* Method: PUT */
    putUpdateRecord: [
        check('name').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .trim().escape(),
        check('code').not().isEmpty().withMessage(ExceptionConfig.VALIDATION.REQUIRE_FIELD)
                    .custom((value, { req }) => {
                        const pk = req.params.pk;
                        return Position.findOne({ attributes: ['id'], where: { code: value } }).then(item => {
                            if (item && item.id != pk) {
                                return Promise.reject(`Code ${value} already in use`);
                            }
                        });
                    })
                    .trim().escape()
    ]
}

export default PositionsValidator;