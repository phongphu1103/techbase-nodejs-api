import { DataTypes } from 'sequelize';

import BaseModel,{ timestampSchema, softDeleteSchema } from './BaseModel';
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
    staffNo: {
        type: DataTypes.STRING,
        field: 'staff_no'
    },
    birthday: DataTypes.DATEONLY,
    positionId: { 
        type: DataTypes.INTEGER,
        field: 'position_id',
        references: {
            model: Position,
            key: 'id'
        }
    },
    status: DataTypes.STRING,
    ...timestampSchema,
    ...softDeleteSchema
}

const User = BaseModel('users', schema)

User.belongsTo(Position, { as: 'Position', foreignKey: 'position_id', targetKey: 'id' })

export default User