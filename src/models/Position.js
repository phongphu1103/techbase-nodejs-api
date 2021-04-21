import { DataTypes } from 'sequelize';

import BaseModel from '../utils/core/BaseModel';

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    status: DataTypes.STRING
};

const Position = BaseModel('positions', schema, true);

export default Position;