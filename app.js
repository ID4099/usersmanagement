const express = require('express');
const routes = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');

/**IMPORTANDO LOS MODELOS */
require('./models/Roles.usuarios');
require('./models/Usuarios');

/***/
const app = express();

/**Configurando el Body-Parser */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.static(__dirname + "/views/appMardac"));


/**configuracion del CORS */
/**configuracion del CORS */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
/**configuracion del CORS */
/**configuracion del CORS */


app.use('/', routes());
db.sync().then(() => console.log('***DB Conectada***')).catch((error) => console.log('***Error en Conexiòn ' + error));

app.listen(3000);