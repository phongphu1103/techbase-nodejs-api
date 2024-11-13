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
    parentId: {
        type: DataTypes.INTEGER,
        field: 'parent_id'
    },
    level: DataTypes.TINYINT,
    status: DataTypes.STRING,
    ...timestampSchema,
    ...softDeleteSchema
}

const Organization = BaseModel('organizations', schema)

export default Organization