import { DataTypes } from 'sequelize';

import MariaDB from '../databases/MariaDb';

const timestampSchema = {
    createdBy: {
        type: DataTypes.INTEGER,
        field: 'created_by',
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        field: 'updated_by',
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: DataTypes.NOW,
        allowNull: true
    },
}

const softDeleteSchema = {
    deletedBy: {
        type: DataTypes.DATE,
        field: 'deleted_by',
        allowNull: true
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
        defaultValue: null,
        allowNull: true
    },
}

const sequelize = MariaDB.getConnection();

const BaseModel = (tableName, fields) => {
    return sequelize.define('SM', fields, { 
        tableName: tableName,
        hooks: {
            beforeUpdate: (instance, options) => {
                instance.updatedAt = new Date();
            },
        }
    })
}

export default BaseModel;
export {
    timestampSchema,
    softDeleteSchema
}