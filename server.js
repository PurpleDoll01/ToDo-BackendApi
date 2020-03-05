const express = require('express');
//Se utiliza esto en vez de import solo por ECMA5, no 6, pero da lo mismo
const bodyParser = require('body-parser');
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
    res.send('Lista de mensajes');
});

router.post('/message', function (req, res) {
    console.log(req.body);
    console.log(req.query);
    res.send(`Mensaje ${req.body.msg} añadido correctamente`);
});

/*app.use('/', function (req, res) {
    res.send('Hola');
}); */

app.listen(3000);
console.log('La app está escuchando en http://localhost:3000');