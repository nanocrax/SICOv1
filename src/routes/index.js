//Aqui iran las url de mi pagina principal

const express = require('express'); //Metodo que me permite generar rutas
const router = express.Router();


router.get('/', (req,res)=> {
    res.render('index');
});

router.get('/about', (req,res)=> {
    res.render('about');
});

module.exports= router;