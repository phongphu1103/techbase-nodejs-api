import { DataTypes } from 'sequelize';

import MariaDb from '../databases/MariaDb';
import Position from './Position';

const dbConnection = MariaDb.getConnection();
const User = dbConnection.define('SM', {
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
    status: DataTypes.STRING,
    created_user_id: DataTypes.INTEGER,
    created_date: DataTypes.DATE,
    updated_user_id: DataTypes.INTEGER,
    updated_date: DataTypes.DATE,
    deleted_user_id: DataTypes.INTEGER,
    deleted_date: DataTypes.DATE
}, {
    tableName: 'users'
});

User.belongsTo(Position, { as: 'Position', foreignKey: 'position_id', targetKey: 'id' });

export default User;