const express = require('express');
//Se utiliza esto en vez de import solo por ECMA5, no 6, pero da lo mismo
const bodyParser = require('body-parser');
const response = require('./network/response');
//Sirve para manejar el contenido de los bodys de manera efectiva
const router = express.Router();
//Permite separar cabeceras, métodos, URL, etc
const app = express();

app.use(bodyParser.json());
app.use(router);

router.get('/message', function (req, res) {
    console.log(req.headers);
    res.header({
        "custom-header": "Nuestro valor personalizado",
    })
    //Así se envían cabeceras personalizadas 
    response.success(req, res, 'Lista de mensajes');
});

router.post('/message', function (req, res) {
    console.log(req.body);
    console.log(req.query);

    if (req.query.error == 'ok') {
        response.error(req, res, 'Error simulado', 400);
    } else {
        response.success(req, res, 'Creado correctamente', 201);
    }   
});

app.use('/app', express.static('public'));
//Aquí se están sirviendo estáticos HTML 

app.listen(3000);
console.log('La app está escuchando en http://localhost:3000');