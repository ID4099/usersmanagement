const express = require('express');
const router = express.Router();

const AuthLog = require('../controllers/Auth.log.controller');
const RolsUsersController = require('../controllers/Rols.Users.controller')
const UsersController = require('../controllers/Users.controller');
const Middelware = require('../middelwares/Auth.token');

/*
    module.exports = function(){
        router.get('//LA RUTA O EL LINK', CONTROLADOR.FUNCION-IMPORTADA);

        return router;
    }
*/
module.exports = function() {
    //Rutas para las Peticiones de http desde el Front-end

    router.post('/management/api/new/rol', RolsUsersController.setRolUser);

    router.post('/management/api/login', AuthLog.login);
    router.post('/management/api/new/user', AuthLog.newUser);

    router.put('/management/api/edit/user/:id', [Middelware.verifyToken, Middelware.verifyAdmin], UsersController.updateUser);

    router.get('/management/api/all/users', [Middelware.verifyToken, Middelware.verifyAdmin], UsersController.getAll);
    router.delete('/management/api/delete/user/:id', UsersController.deleteUser);
    router.get('/common/users', [Middelware.verifyToken, Middelware.verifyAdmin], UsersController.getCommonUsers);

    return router;
}