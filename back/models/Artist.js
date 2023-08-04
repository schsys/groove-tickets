const { DataTypes } = require('sequelize');
const { StatusType } = require('../dataType');

module.exports = (sequelize) => {
    sequelize.define('Artist', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'Id'
        },
        groupId: {
            type: DataTypes.INTEGER,
            field: 'GroupId'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'Name'
        },
        status: {
            type: StatusType, 
            allowNull: false,
            defaultValue: 'Active',
            field: 'Status'
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};
