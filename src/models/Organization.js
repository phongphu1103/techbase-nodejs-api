import { DataTypes } from 'sequelize';

import BaseModel from './BaseModel';

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    level: DataTypes.TINYINT,
    status: DataTypes.STRING
};

const Organization = BaseModel('organizations', schema, true);

export default Organization;