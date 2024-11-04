import { Sequelize } from 'sequelize';

import DbConfig from '../configs/DbConfig';

class MariaDB
{
    /*
     * Raw server connection
     */
    // connection;
    constructor() {
        this._connection = new Sequelize(DbConfig.DB_NAME, DbConfig.DB_USER, DbConfig.DB_PASS, {
            host: DbConfig.DB_HOST,
            port: DbConfig.DB_PORT,
            dialect: DbConfig.DB_SCHEME,
            define: { timestamps: false }
        });
    }

    getConnection() {
        return this._connection;
    }
}

export default new MariaDB();