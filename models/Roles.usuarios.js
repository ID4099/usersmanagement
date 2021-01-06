const Sequelize = require('sequelize');
const db = require('../config/db');

const RolesUsuarios = db.define('ROLES_USUARIOS', {
    ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    ROL_USUARIO: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'ROLES_USUARIOS'

});

module.exports = RolesUsuarios;