import { DataTypes } from 'sequelize';

import MariaDB from '../../databases/MariaDb';

const timestampSchema = {
    created_user_id: DataTypes.INTEGER,
    created_date: DataTypes.DATE,
    updated_user_id: DataTypes.INTEGER,
    updated_date: DataTypes.DATE,
    deleted_user_id: DataTypes.INTEGER,
    deleted_date: DataTypes.DATE
};

const sequelize = MariaDB.connect();

const BaseModel = (tableName, fields, useTimestamp) => {
    let schema = {};
    schema = useTimestamp ? {...fields, ...timestampSchema} : fields;
    return sequelize.define('SM', schema, { tableName: tableName });
}

export default BaseModel;