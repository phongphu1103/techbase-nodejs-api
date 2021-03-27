import { DataTypes, QueryTypes } from 'sequelize';

import MariaDb from '../databases/MariaDb';
import Organization from './Organization';
import User from './User';

const dbConnection = MariaDb.connect();
const UserOrganization = dbConnection.define('SM', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    organization_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}, {
    tableName: 'user_organization'
});

UserOrganization.delete = async function(params){
    const sql = 'DELETE FROM `user_organization` WHERE `user_id`=:user_id';
    return await dbConnection.query(sql, { replacements: { user_id: params.user_id }, type: QueryTypes.DELETE });
}

User.belongsToMany(Organization, { as: 'Teams', through: UserOrganization, foreignKey: 'user_id', otherKey: 'organization_id' });
Organization.belongsToMany(User, { as: 'Members', through: UserOrganization, foreignKey: 'organization_id', otherKey: 'user_id' });

export default UserOrganization;