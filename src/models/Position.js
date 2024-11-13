import { DataTypes } from 'sequelize';

import BaseModel, { timestampSchema, softDeleteSchema } from './BaseModel';

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    status: DataTypes.STRING,
    ...timestampSchema,
    ...softDeleteSchema
}

const Position = BaseModel('positions', schema)

export default Position