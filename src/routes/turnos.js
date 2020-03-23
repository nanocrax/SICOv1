// Aqui iran las url o rutas relacionadas con turnos

const express = require('express'); //Metodo que me permite generar rutas
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth.js'); //Necesito el helper para hacer autenticaciones

router.get('/turnos/turnos-reservas', isAuthenticated,(req,res)=>{ //Ruta para obtener la vista
    res.render('turnos/turnos');
});

router.get('/turnos/preturnos', isAuthenticated,(req,res)=>{ //Ruta para obtener la vista
    res.render('turnos/preturnos');
});

module.exports=router;