const Sequelize = require('sequelize');
const db = require('../config/db');
const RolesUsuarios = require('./Roles.usuarios');

const Usuarios = db.define('USUARIOS', {
    ID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    USUARIO: {
        type: Sequelize.STRING,
        allowNull: false
    },
    PASSWORD: {
        type: Sequelize.STRING,
        allowNull: false
    },
    NOMBRE: {
        type: Sequelize.STRING,
        allowNull: false
    },
    APELLIDO: {
        type: Sequelize.STRING,
        allowNull: false
    },
    EMAIL: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'USUARIOS'

});

Usuarios.belongsTo(RolesUsuarios, {
    onDelete: 'restrict',
    onUpdate: 'restrict',
    foreignKey: 'ID_ROL_USUARIO',
    foreignKeyConstraint: true
});

module.exports = Usuarios;