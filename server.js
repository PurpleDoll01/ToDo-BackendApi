const express = require('express');
//Se utiliza esto en vez de import solo por ECMA5, no 6, pero da lo mismo
const bodyParser = require('body-parser');

const router = require('./network/routes');
const app = express();

app.use(bodyParser.json());

router(app);

app.use('/app', express.static('public'));
//Aquí se están sirviendo estáticos HTML 

app.listen(3000);
console.log('La app está escuchando en http://localhost:3000');