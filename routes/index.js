const express = require('express');
const router = express.Router();

const AuthLog = require('../controllers/Auth.log.controller');
const UsuariosController = require('../controllers/Usuarios.controller');
const Middelware = require('../middelwares/Auth.token');

/*
    module.exports = function(){
        router.get('//LA RUTA O EL LINK', CONTROLADOR.FUNCION-IMPORTADA);

        return router;
    }
*/
module.exports = function() {
    //Rutas para las Peticiones de http desde el Front-end

    router.post('/panalytics/api/login', AuthLog.login);
    router.post('/panalytics/api/new/user', AuthLog.newUser);

    router.get('/panalytics/all/users', [Middelware.verifyToken, Middelware.verifyAdmin], UsuariosController.getAll);
    router.get('/common/users', [Middelware.verifyToken, Middelware.verifyAdmin], UsuariosController.getCommonUsers);

    return router;
}