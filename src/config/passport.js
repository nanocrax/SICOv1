const passport = require ('passport'); //Requiero passport
const LocalStrategy = require ('passport-local').Strategy; //Utilizare la estrategia de passport-local

const mongoose = require('mongoose');//Necesito ingresar a la base de datos
const User = require('../models/User')//Necesito el modelo de datos


passport.use(new LocalStrategy({ //Defino una nueva extrategia de autenticacion
    usernameField: 'email' //Defino que es lo que necesito para autenticar
}, async (email, password, done) => {
    //Funcion que recibe el email, contraseña y un callback para terminar con la autenticacion. Aqui se autenticara si todo esta correcto
    const user = await User.findOne({email: email}); //Buscamos el usuario que tenga ese email en la base de datos
    if (!user){ //Si no hay usuario
        return done(null,false,{message: 'Usuario No encontrado'});//primer valor el error, segundo un usuario y tercero un mensaje
    }else{ //Si existe un usuario
        //Encontramos al usuario, validamos la contraseña
        const match = await user.matchPassword(password); //busco si la contraseña es la misma
        if (match){ //si existe un resultado?
            return done(null,user); //devuelvo el usuario sin errores
        }else{
            return done(null,false,{message: 'Contraseña incorrecta'}); //la contraseña es incorrecta, devuelvo un mensaje
        }
    }
}));

//Metodo para almacenar el usuario cuando se loguea
passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user);
    });
});