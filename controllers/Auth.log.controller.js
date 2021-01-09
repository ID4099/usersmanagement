const Usuarios = require('../models/Usuarios');
const bcrypt = require('../libs/bcrypt');
const JWT = require('jsonwebtoken');

const GLOBAL = 'innovaEcc';

exports.newUser = async(req, res) => {
    const usuario = req.body;
    let usuarioTmp = null;

    usuario.PASSWORD = await bcrypt.encrypt(usuario.PASSWORD);

    try {
        let status, message;

        const ConsultarBase1 = await Usuarios.findOne({
            where: {
                $or: [
                    { PASSWORD: usuario.PASSWORD },
                    { EMAIL: { $like: usuario.EMAIL } }

                ]

            }
        });

        const ConsultarBase2 = await Usuarios.findOne({
            where: {
                $and: [
                    { PASSWORD: usuario.PASSWORD },
                    { EMAIL: { $like: usuario.EMAIL } }
                ]


            }
        });

        if (ConsultarBase1 || ConsultarBase2) {
            status = 'error';
            message = 'data already in the base';
            usuarioTmp = usuario;
        } else {
            status = 'success';
            message = 'data saved successfully';

            usuarioTmp = await Usuarios.create(usuario);
        }

        const confirmation = {
            status: status,
            message: message,
            usuarioTmp
        }

        res.send(confirmation);

    } catch (error) {
        res.status(400).send(error);
    }
}

exports.login = async(req, res, next) => {
    const usuario = req.body;
    let status, message, user, token;

    try {

        const ConsultaVerificacionUsuario = await Usuarios.findOne({
            where: {
                EMAIL: usuario.EMAIL
            }
        });

        if (ConsultaVerificacionUsuario) {
            const comparePasswordResult = await bcrypt.compare(usuario.PASSWORD, ConsultaVerificacionUsuario.PASSWORD)

            if (comparePasswordResult) {
                status = 'success';
                message = 'user logged in';
                user = {
                    name: ConsultaVerificacionUsuario.NOMBRE,
                    lastname: ConsultaVerificacionUsuario.APELLIDO
                };

                token = JWT.sign({ ID: ConsultaVerificacionUsuario.ID }, GLOBAL, {
                    expiresIn: 86400 //50
                });

                res.status(200);

            } else {
                status = 'failed';
                message = 'user not logged, by password';
                token = null;
                user = null;
                res.status(404);
            }
        } else {
            status = 'error';
            message = 'user not found';
            token = null;
            user = null;
            res.status(404);
        }

        const confirmation = {
            status: status,
            message: message,
            user: user,
            token: token
        }
        res.send(confirmation);
        next();

    } catch (error) {
        res.status(400).send(error);
    }
}