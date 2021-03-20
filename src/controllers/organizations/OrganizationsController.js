import { isArray, isEmpty } from 'lodash';
import { Op } from 'sequelize';

import Organization from '../../models/Organization';
import User from '../../models/User';
import ExceptionConfig from '../../configs/ExceptionConfig';

class OrganizationsController {
    async get_index(req, res, next) {
        try {
            const pk = req.params.pk;
            const params = req.query;
            const fields = Organization.rawAttributes;
            const limit = params.limit || 100;
            const offset = params.offset || 0;

            let conq = {};
            let options = {
                attributes:  { exclude: ['created_user_id', 'created_date', 'updated_user_id', 'updated_date', 'deleted_user_id', 'deleted_date'] },
                where: {},
                include: [
                    {
                        attributes: [ 'id', 'username', 'staff_no' ],
                        model: User,
                        as: 'Members',
                        required: false,
                        through: {
                            attributes: [],
                            as: 'UO',
                        }
                    }
                ],
                limit: limit,
                offset: offset
            };
            let items;

            for(let key in fields){
                if(params.hasOwnProperty(key) && !isEmpty(params[key])){
                    let value = params[key];
                    if(isArray(value)){
                        conq[key] = { [Op.in]:value };
                    }else{
                        conq[key] = value;
                    }
                }
            }

            if(pk){
                options.where = {...conq, id: pk};
                items = await Organization.findOne(options);
            }else{
                options.where = conq;
                items = await Organization.findAll({...options, order: [['parent_id', 'ASC' ], ['level', 'ASC']]});
            }

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: items,
                total: pk ? (items ? 1 : 0) : items.length
            });
        } catch(err) {
            next(err);
        }
    }

    async post_index(req, res, next) {
        try {
            const params = req.body;
            const fields = Organization.rawAttributes;
            let data = {};

            for(let key in fields){
                if(params.hasOwnProperty(key)){
                    let value = params[key];
                    (key == 'parent_id') && (value || (value = 0));
                    data[key] = value;
                }
            }

            data['level'] = 1;
            const parent = await Organization.findOne({ attributes: ['id', 'level'], where: { 'id': params.parent_id } });
            if(parent){
                data['level'] = +parent.level + 1;
            }

            const item = await Organization.build(data).save();

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                record_id: item.id
            });
        } catch(err) {
            next(err);
        }
    }

    async put_index(req, res, next) {
        try {
            const pk = !isNaN(req.params.pk) ? req.params.pk : null;
            const params = req.body;
            const fields = Organization.rawAttributes;
            let data = {};

            if(!pk){
                return res.jsonError({
                    message: ExceptionConfig.COMMON.MISSING_PRIMARY_KEY,
                    record_id: pk
                });
            }

            for(let key in fields){
                if(params.hasOwnProperty(key)){
                    let value = params[key];
                    (key == 'parent_id') && (value || (value = 0));
                    data[key] = value;
                }
            }

            data['level'] = 1;
            const parent = await Organization.findOne({ attributes: ['id', 'level'], where: { 'id': params.parent_id } });
            if(parent){
                data['level'] = +parent.level + 1;
            }

            const item = await Organization.findByPk(pk, {
                attributes: { exclude: ['created_user_id', 'created_date', 'updated_user_id', 'updated_date', 'deleted_user_id', 'deleted_date'] }
            });

            if(!(item instanceof Organization)){
                return res.jsonError({
                    message: ExceptionConfig.COMMON.ITEM_NOT_FOUND,
                    record_id: pk
                });
            }

            await item.set(data).save();

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_UPDATE_SUCCESS,
                record_id: item.id
            });
        } catch(err) {
            next(err);
        }
    }
}

export default new OrganizationsController();