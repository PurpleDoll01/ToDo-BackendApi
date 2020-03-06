const express = require('express');
//Se utiliza esto en vez de import solo por ECMA5, no 6, pero da lo mismo
const bodyParser = require('body-parser');

const router = require('./network/routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

router(app);

app.use('/app', express.static('public'));
//Aquí se están sirviendo estáticos HTML 

app.listen(PORT);
console.log('La app está escuchando en http://localhost:3000');