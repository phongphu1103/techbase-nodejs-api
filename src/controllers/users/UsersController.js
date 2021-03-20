import { isArray, isEmpty } from 'lodash';

import Organization from '../../models/Organization';
import Position from '../../models/Position';
import User from '../../models/User';
import UserOrganization from '../../models/UserOrganization';
import UsersModel from "../../models/UsersModel"
import ExceptionConfig from "../../configs/ExceptionConfig"
import HashPassword from "../../utils/HashPassword"
import Session from "../../utils/Session"

class UsersController
{
    async get_index(req, res, next) {
        try {
            // const users = await UsersModel.findAll(/test api - 3/i)
            // const total = await users.count()
            const pk = req.params.pk;
            const params = req.query;
            const fields = User.rawAttributes;
            const limit = params.limit || 1500;
            const offset = params.offset || 0;

            let conq = {};
            let options = {
                attributes:  { exclude: ['password', 'created_user_id', 'created_date', 'updated_user_id', 'updated_date', 'deleted_user_id', 'deleted_date'] },
                where: {},
                include: [
                    {
                        attributes: [ 'name' ], // set empty array if you have not to select fields from joined tables
                        model: Position,
                        as: 'Position',
                        required: false // set required is false if you use left join
                    },
                    {
                        attributes: [ 'name' ],
                        model: Organization,
                        as: 'Teams',
                        required: false,
                        through: {
                            attributes: [],
                            as: 'UO',
                            where: { '$Teams.status$': 'active' },
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
                items = await User.findOne(options);
            }else{
                options.where = conq;
                items = await User.findAll({...options, order: [['position_id', 'ASC']]});
            }

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.REQUEST_SUCCESS,
                data: items,
                total: pk ? (items ? 1 : 0) : items.length
            });
        } catch (err) {
            next(err)
        }
    }

    async post_index(req, res, next) {
        try {
            const params = req.body;
            const fields = User.rawAttributes;
            let data = {};

            for(let key in fields){
                if(params.hasOwnProperty(key)){
                    let value = params[key];
                    (key == 'password') && (value = HashPassword.hash(value));
                    data[key] = value;
                }
            }

            // const user = new UsersModel({
            //     username: "Test API - " + Math.round(Math.random()*10000000000),
            //     password: HashPassword.hash("passpass"),
            // })
            // await user.save()
            const item = await User.build(data).save();

            //======================== Insert User Organization =================
            if(params.organizations){
                let userOrganization = {
                    user_id: item.id,
                    organization_id: null
                };
                for(let idx in params.organizations){
                    userOrganization.organization_id = params.organizations[idx];
                    await UserOrganization.build(userOrganization).save();
                }
            }

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_CREATE_SUCCESS,
                record_id: item.id
            })
        } catch (err) {
            next(err)
        }
    }

    async put_index(req, res, next) {
        try {
            const pk = !isNaN(req.params.pk) ? req.params.pk : null;
            const params = req.body;
            const fields = User.rawAttributes;
            let data = {};

            if(!pk){
                return res.jsonError({
                    message: ExceptionConfig.COMMON.MISSING_PRIMARY_KEY,
                    record_id: pk
                })
            }

            for(let key in fields){
                if(params.hasOwnProperty(key)){
                    let value = params[key];
                    (key == 'password') && (value = HashPassword.hash(value));
                    data[key] = value;
                }
            }

            const item = await User.findByPk(pk, {
                attributes: { exclude: ['created_user_id', 'created_date', 'updated_user_id', 'updated_date', 'deleted_user_id', 'deleted_date'] }
            });

            if(!(item instanceof User)){
                return res.jsonError({
                    message: ExceptionConfig.COMMON.ITEM_NOT_FOUND,
                    record_id: pk
                });
            }

            await item.set(data).save();

            //======================== Insert User Organization =================
            if(params.organizations){
                await UserOrganization.delete({ user_id: pk });

                let userOrganization = {
                    user_id: item.id,
                    organization_id: null
                };
                for(let idx in params.organizations){
                    userOrganization.organization_id = params.organizations[idx];
                    await UserOrganization.build(userOrganization).save();
                }
            }

            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_UPDATE_SUCCESS,
                record_id: item.id
            });
        } catch(err) {
            next(err);
        }
    }

    async delete (req, res, next){
        const id = req.params.id
        try {
            await UsersModel.softDelete(id)
            return res.jsonSuccess({
                message: ExceptionConfig.COMMON.ITEM_DELETE_SUCCESS,
                data: id
            })
        } catch (err) {
            next(err)
        }
    }

    async detail (req, res, next) {
        try {
            return res.jsonSuccess({
                message: "You requested detail users controller",
                errors: "You requested detail users controller"
            })
        } catch (err) {
            next(err)
        }
    }
}

export default new UsersController()