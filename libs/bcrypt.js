const bcrypt = require('bcryptjs');

exports.encrypt = async (parametro) => {
    var salt = bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(parametro, salt);
}

exports.compare = async (parametro, parametroVerf) => {
    return await bcrypt.compareSync(parametro, parametroVerf);
}