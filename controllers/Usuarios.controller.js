const TiposUsuarios = require('../models/Roles.usuarios');
const Usuarios = require('../models/Usuarios');



exports.getAll = async(req, res) => {
    try {
        const ConsultarUsuarios = await Usuarios.findAll();

        ConsultarUsuarios.forEach(element => {
            element.PASSWORD = 'protected'
        });

        res.send(ConsultarUsuarios);
    } catch (error) {
        res.send(error);
    }
}

exports.getCommonUsers = async(req, res) => {
    try {
        const ConsultarUsuarios = await Usuarios.findAll({
            where: {
                ID_ROL_USUARIO: 2
            }
        });

        ConsultarUsuarios.forEach(element => {
            element.PASSWORD = 'protected'
        });

        res.send(ConsultarUsuarios);
    } catch (error) {
        res.send(error);
    }
}