const RolsUsers = require('../models/Roles.usuarios');

exports.setRolUser = async(req, res) => {
    const rolUser = {
        ROL_USUARIO: "Admin"
    }
    try {
        await RolsUsers.create(rolUser)
        res.status(201).send('ok');
    } catch (error) {
        res.status(400).send(error);
    }
}