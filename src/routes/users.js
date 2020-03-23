// Autenticaciones dentro de la aplicacion

const express = require('express'); //Metodo que me permite generar rutas
const router = express.Router();

const User = require('../models/User'); //Necesito el modelo de datos del usuario

const passport = require('passport'); //Necesito passport (la estrategia local definida en el archivo)

router.get('/users/signup',(req,res)=>{
    res.render('users/signup');
});

router.post('/users/signup',async (req,res)=>{ //Recibo los datos ingresados
    const {name,email,password,confirm_password} = req.body; //almaceno los inputs
    const errors = []; //variable para guardar los errores
    if(name <= 0){
        errors.push({text: 'Please Insert your Name'});
    }
    if(email <= 0){
        errors.push({text: 'Please Insert your Email'});
    }
    if(password <= 0){
        errors.push({text: 'Please Insert your password'});
    }
    if(password <= 0){
        errors.push({text: 'Please Insert your confirm password'});
    }
    if(password != confirm_password){ //controlo que la contraseña sea igual a la confirmacion de contraseña
        errors.push({text: 'Password do not match'});
    }
    if(password.length < 4){ //controlo que la contraseña no sea menor a 4 caracteres
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if (errors.length > 0){ //si hay errores, vuelvo a renderizar la vista y envio los errores para mostrarlos y los datos asi no tenga que ingresar nuevamente
        res.render('users/signup',{errors,name,email,password,confirm_password});
    }else{
        //si todo esta bien guardo
        const emailUser = await User.findOne({email: email}); //Busco si existe un email igual
        if (emailUser){ //Si el email existe
            req.flash('error_msg','El email ya esta en uso, vuelva a cargar los datos');
            res.redirect('/users/signup');
            //res.send('Email ya existe');
        }
        const newUser = new User({name,email,password}); //Creo un usuario
        newUser.password = await newUser.encryptPassword(password); //Encripto la contraseña y sobreescribo la anterior
        await newUser.save(); //Guardo el usuario
        req.flash('success_msg',"Estas registrado"); //Muestro mensaje
        res.redirect('/users/signin');//redirecciono a la ruta para ingresar con usuario y contraseña
    }
});

router.get('/users/signin',(req,res)=>{
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/notes', //Si todo va bien redirecciono a las notas
    failureRedirect: '/users/signin', //Si fallo la autenticacion redirecciono 
    failureFlash: true //Mensajes
}));

router.get('/users/logout',(req,res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;