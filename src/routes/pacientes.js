// Aqui iran las url o rutas relacionadas con pacientes

const express = require('express'); //Metodo que me permite generar rutas
const router = express.Router();

const { isAuthenticated } = require('../helpers/auth.js'); //Necesito el helper para hacer autenticaciones

router.get('/pacientes/hce', isAuthenticated,(req,res)=>{ //Ruta para obtener la vista
    res.render('pacientes/hce');
});

router.get('/pacientes/abm', isAuthenticated,(req,res)=>{ //Ruta para obtener la vista
    res.render('pacientes/abmpacientes');
});

module.exports=router;