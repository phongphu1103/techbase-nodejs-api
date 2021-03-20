import { DataTypes, QueryTypes } from 'sequelize';

import MariaDb from '../databases/MariaDb';

const dbConnection = MariaDb.getConnect();
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

export default UserOrganization;