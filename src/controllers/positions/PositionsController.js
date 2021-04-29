import { isArray, isEmpty } from 'lodash';
import { Op } from 'sequelize';

import Position from '../../models/Position';
import ExceptionConfig from '../../configs/ExceptionConfig';
import RedisClient from '../../databases/RedisClient';

class PositionsController
{
    async get_index(req, res, next) {
        const pk = req.params.pk;
        const params = req.query;
        const limit = params.limit || 100;
        const offset = params.offset || 0;

        try {
            const fields = Position.rawAttributes;
            let conq = {}, items,
            options = {
                attributes: ['id', 'name', 'code', 'status'],
                where: {},
                limit: limit,
                offset: offset
            };

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
                items = await Position.findOne(options);
            }else{
                options.where = conq;
                // calculate cache key
                try{
                    const client = RedisClient;
                    let cache = await client.hgetAsync('pos', 'positions');
                    items = cache ? JSON.parse(cache) : [];
                    // if cache not found, making query
                    if(!items.length){
                        items = await Position.findAll(options);
                        await client.hset('pos', 'positions', JSON.stringify(items));
                    }
                } catch(e) {
                    items = await Position.findAll(options);
                }
            }

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: items,
                total: pk ? (items ? 1 : 0) : items.length
            });
        } catch (err) {
            next(err);
        }
    }

    async post_index(req, res, next) {
        const params = req.body;
        let data = {};

        try {
            const fields = Position.rawAttributes;
            for(let key in fields){
                if(params.hasOwnProperty(key)){
                    data[key] = params[key];
                }
            }
            const item = await Position.build(data).save();

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                record_id: item.id
            });
        } catch(err) {
            next(err);
        }
    }

    async put_index(req, res, next) {
        const pk = !isNaN(req.params.pk) ? req.params.pk : null;
        const params = req.body;
        let data = {};

        if(!pk){
            return res.jsonError({
                message: ExceptionConfig.COMMON.MISSING_PRIMARY_KEY,
                record_id: pk
            })
        }

        try {
            const fields = Position.rawAttributes;
            for(let key in fields){
                if(params.hasOwnProperty(key)){
                    data[key] = params[key];
                }
            }

            const item = await Position.findByPk(pk, {
                attributes: { exclude: ['created_user_id', 'created_date', 'updated_user_id', 'updated_date', 'deleted_user_id', 'deleted_date'] }
            });

            if(!(item instanceof Position)){
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
            next(err)
        }
    }
}

export default new PositionsController();