const express = require('express');
//Se utiliza esto en vez de import solo por ECMA5, no 6, pero da lo mismo
const bodyParser = require('body-parser');

const router = require('./network/routes');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

router(app);

app.listen(PORT);
console.log('La app está escuchando en http://localhost:4000');