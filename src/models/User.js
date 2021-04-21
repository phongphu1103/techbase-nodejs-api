import { DataTypes } from 'sequelize';

import BaseModel from '../utils/core/BaseModel';
import Position from './Position';

const schema = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    staff_no: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    position_id: DataTypes.INTEGER,
    status: DataTypes.STRING
};

const User = BaseModel('users', schema, true);

User.belongsTo(Position, { as: 'Position', foreignKey: 'position_id', targetKey: 'id' });

export default User;