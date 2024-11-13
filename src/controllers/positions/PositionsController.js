import { isArray, isEmpty } from 'lodash';
import { Op } from 'sequelize';

import Controller from '../Controller';
import CustomError from '../../utils/CustomError';
import ExceptionConfig from '../../configs/ExceptionConfig';
import Position from '../../models/Position';
import PositionRepository from '../../repositories/PositionRepository';
import RedisClient from '../../databases/RedisClient';

class PositionsController extends Controller {
    constructor() {
        super()
        this.repository = new PositionRepository();
    }
    
    async get_index(req, res, next) {
        const pk = req.params.pk;
        const params = req.query;
        const limit = params.limit || 100;
        const offset = params.offset || 0;

        try {
            const fields = Position.getAttributes();
            let conq = {}, items,
            options = {
                attributes: ['id', 'name', 'code', 'status'],
                where: {},
                limit: limit,
                offset: offset
            };

            for (let key in fields) {
                if (params.hasOwnProperty(key) && !isEmpty(params[key])) {
                    let value = params[key];
                    if (isArray(value)) {
                        conq[key] = { [Op.in]:value };
                    } else {
                        conq[key] = value;
                    }
                }
            }

            if (pk) {
                options.where = {...conq, id: pk};
                items = await Position.findOne(options);
            } else {
                options.where = conq;
                // calculate cache key
                try {
                    const client = RedisClient;
                    let cache = await client.hgetAsync('pos', 'positions');
                    items = cache ? JSON.parse(cache) : [];
                    // if cache not found, making query
                    if (!items.length) {
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

    async storeExecute (req) {
        const params = req.body

        const fields = await this.repository.getAttributes()
        let data = Object.keys(fields).filter(key => params.hasOwnProperty(key)).reduce((obj, key) => {
            obj[key] = params[key]
            return obj
        }, {})

        // const item = await Position.build(data).save();
        const item = await this.repository.createWithAttributes(data)

        return {
            code: ExceptionConfig.CODE.CREATED,
            message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
            record_id: item.id
        }
    }

    async updateExecute(req) {
        const pk = !isNaN(req.params.pk) ? req.params.pk : null;
        const params = req.body;
        let data = {};

        if (!pk) {
            throw new CustomError(ExceptionConfig.COMMON.MISSING_PRIMARY_KEY, ExceptionConfig.CODE.BAD_REQUEST)
        }

        const fields = await this.repository.getAttributes();
        for (let key in fields) {
            if (params.hasOwnProperty(key)) {
                data[key] = params[key];
            }
        }

        // const item = await Position.findByPk(pk, {
        //     attributes: { exclude: ['created_by', 'created_at', 'updated_by', 'updated_at', 'deleted_by', 'deleted_at'] }
        // });
        const item = await this.repository.model(pk)
        if (!(item instanceof Position)) {
            throw new CustomError(ExceptionConfig.COMMON.ITEM_NOT_FOUND, ExceptionConfig.CODE.NOT_FOUND)
        }

        // await item.set(data).save();
        await this.repository.updateWithAttributes(data)

        return {
            message: ExceptionConfig.COMMON.ITEM_UPDATE_SUCCESS,
            record_id: item.id
        };
    }
}

export default new PositionsController();