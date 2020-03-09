const express = require('express');
//Se utiliza esto en vez de import solo por ECMA5, no 6, pero da lo mismo
const bodyParser = require('body-parser');

const router = require('./network/routes');
const app = express();
const PORT = process.env.PORT || 4000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
    next();
});


app.use(bodyParser.json());

router(app);

app.listen(PORT);
console.log('La app está escuchando en http://localhost:4000');