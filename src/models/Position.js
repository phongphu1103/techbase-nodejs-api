import { DataTypes } from 'sequelize';

import MariaDb from '../databases/MariaDb';

const dbConnection = MariaDb.connect();
const Position = dbConnection.define('SM', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    status: DataTypes.STRING,
    created_user_id: DataTypes.INTEGER,
    created_date: DataTypes.DATE,
    updated_user_id: DataTypes.INTEGER,
    updated_date: DataTypes.DATE,
    deleted_user_id: DataTypes.INTEGER,
    deleted_date: DataTypes.DATE
}, {
    tableName: 'positions'
});

export default Position;