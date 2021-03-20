import { DataTypes } from 'sequelize';

import MariaDb from '../databases/MariaDb';
import Position from './Position';
import Organization from './Organization';
import UserOrganization from './UserOrganization';

const dbConnection = MariaDb.getConnect();
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
User.belongsToMany(Organization, { as: 'Teams', through: UserOrganization, foreignKey: 'user_id', otherKey: 'organization_id' });
Organization.belongsToMany(User, { as: 'Members', through: UserOrganization, foreignKey: 'organization_id', otherKey: 'user_id' });

export default User;