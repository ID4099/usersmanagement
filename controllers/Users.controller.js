const TiposUsuarios = require('../models/Roles.usuarios');
const Users = require('../models/Usuarios');

exports.getAll = async(req, res) => {
    try {
        const queryAllUsers = await Users.findAll();

        queryAllUsers.forEach(element => {
            element.PASSWORD = 'protected'
        });

        res.send(queryAllUsers);
    } catch (error) {
        res.send(error);
    }
}

exports.getCommonUsers = async(req, res) => {
    try {
        const queryCommonUsers = await Users.findAll({
            where: {
                ID_ROL_USUARIO: 2
            }
        });

        queryCommonUsers.forEach(element => {
            element.PASSWORD = 'protected'
        });

        res.send(queryCommonUsers);
    } catch (error) {
        res.send(error);
    }
}

exports.updateUser = async(req, res) => {
    const user = req.body;
    const param = req.params
    var status, message;

    try {
        const verifyUser = await Users.findOne({
            where: {
                ID: param.id
            }
        });

        if (verifyUser) {
            await Users.update({

                NOMBRE: user.NOMBRE,
                APELLIDO: user.APELLIDO,
                USUARIO: user.USUARIO,
                EMAIL: user.EMAIL

            }, {
                where: {
                    ID: param.id
                }
            });

            status = 'success';
            message = 'successfully updated';

        } else {
            status = 'error';
            message = 'not updated, data not found';
        }

        const confirmation = {
            status: status,
            message: message
        }

        res.send(confirmation);

    } catch (error) {
        res.send(error);
    }
}