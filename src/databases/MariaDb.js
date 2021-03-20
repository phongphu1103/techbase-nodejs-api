import { Sequelize } from 'sequelize';

import DbConfig from '../configs/DbConfig';

class MariaDB
{
    constructor() {
        this.connect = new Sequelize(DbConfig.DB_NAME, DbConfig.DB_USER, DbConfig.DB_PASS, {
            host: DbConfig.DB_HOST,
            dialect: DbConfig.DB_SCHEME,
            define: { timestamps: false }
        });
    }

    getConnect() {
        return this.connect;
    }
}

export default new MariaDB();