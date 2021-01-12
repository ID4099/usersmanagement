const JWT = require('jsonwebtoken');
const GLOBAL = 'innovaEcc';
const Usuarios = require('../models/Usuarios');
const TiposUsuarios = require('../models/Roles.usuarios');

exports.verifyToken = async(req, res, next) => {
    const token = req.headers["x-access-token"];
    const usuario = req.body;
    let status, message;

    try {
        if (!token) {
            status = 'failed';
            message = 'token not found';
            const confirmation = {
                status: status,
                message: message
            }

            res.status(401).send(confirmation);

        } else {
            const decrypt = JWT.verify(token, GLOBAL);

            const UsuarioActual = await Usuarios.findOne({
                where: {
                    ID: decrypt.ID
                }
            });

            if (!UsuarioActual) {
                status = 'internal error';
                message = 'user not found, communicate to the IT department';
                res.status(404)
            } else {
                next();
            }
        }
    } catch (error) {
        res.status(400).send(error);
    }

}

exports.verifyAdmin = async(req, res, next) => {
    const token = req.headers["x-access-token"];
    const decrypt = JWT.verify(token, GLOBAL);

    try {
        const UsuarioActual = await Usuarios.findOne({
            where: {
                ID: decrypt.ID
            }
        });

        const VerificarTipoUsuario = await TiposUsuarios.findOne({
            where: {
                ID: UsuarioActual.ID_ROL_USUARIO
            }
        });

        if (VerificarTipoUsuario.ROL_USUARIO == 'Admin') {
            next();
        } else {
            const confirmation = {
                status: 'failed',
                message: 'not have sufficient permissions'
            }

            res.status(403).send(confirmation);

        }
    } catch (error) {
        res.status(400).send(error);
    }

}