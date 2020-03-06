const express = require('express');
const response = require('../../network/response');
//Sirve para manejar el contenido de los bodys de manera efectiva

const router = express.Router();
//Permite separar cabeceras, métodos, URL, etc

router.get('/', function (req, res) {
    console.log(req.headers);
    res.header({
        "custom-header": "Nuestro valor personalizado",
    })
    //Así se envían cabeceras personalizadas 
    response.success(req, res, 'Lista de mensajes');
});

router.post('/', function (req, res) {
    console.log(req.body);
    console.log(req.query);

    if (req.query.error == 'ok') {
        response.error(req, res, 'Error inesperado', 400, 'Es solo una simulación de los errores');
    } else {
        response.success(req, res, 'Creado correctamente', 201);
    }   
});

module.exports = router;