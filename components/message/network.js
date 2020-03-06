const express = require('express');
const response = require('../../network/response');
//Sirve para manejar el contenido de los bodys de manera efectiva
const controller = require('./controller');

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

    controller.addMessage(req.body.user, req.body.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Información inválida', 400, 'Error en el controlador');
        });   
});

module.exports = router;