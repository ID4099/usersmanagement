const express = require('express');
const router = express.Router();

const AuthLog = require('../controllers/Auth.log.controller');
const UsuariosController = require('../controllers/Users.controller');
const Middelware = require('../middelwares/Auth.token');

/*
    module.exports = function(){
        router.get('//LA RUTA O EL LINK', CONTROLADOR.FUNCION-IMPORTADA);

        return router;
    }
*/
module.exports = function() {
    //Rutas para las Peticiones de http desde el Front-end

    router.post('/management/api/login', AuthLog.login);
    router.post('/management/api/new/user', AuthLog.newUser);

    router.put('/management/api/edit/user/:id', [Middelware.verifyToken, Middelware.verifyAdmin], UsuariosController.updateUser);

    router.get('/management/api/all/users', [Middelware.verifyToken, Middelware.verifyAdmin], UsuariosController.getAll);
    router.get('/common/users', [Middelware.verifyToken, Middelware.verifyAdmin], UsuariosController.getCommonUsers);

    return router;
}