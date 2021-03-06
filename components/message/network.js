const express = require('express');
const response = require('../../network/response');
//Sirve para manejar el contenido de los bodys de manera efectiva
const controller = require('./controller');

const router = express.Router();
//Permite separar cabeceras, métodos, URL, etc

router.get('/', function (req, res) {
    const filterMessages = req.query._id || null;
    controller.getMessages(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
});

router.get('/:id', function (req, res) {
    controller.getMessage(req.params.id)
        .then((messageList) => {
            response.success(req, res, messageList, 200);
        })
        .catch(e => {
            response.error(req, res, 'Unexpected Error', 500, e);
        });
});

router.post('/', function (req, res) {
    controller.addMessage(req.body.text)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'Información inválida', 400, 'Error en el controlador');
        });   
});

router.patch('/:id', function (req, res) {
    controller.updateMessage(req.params.id, req.body.checked, req.body.notes)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        })

})

router.delete('/:id', function(req, res) {
    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `Texto ${req.params.id} eliminado`, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        })
})

module.exports = router;