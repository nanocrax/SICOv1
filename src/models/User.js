const mongoose = require('mongoose');
const { Schema } = mongoose; //Necesito solo el esquema

const bcrypt = require ('bcryptjs'); //Requiero el bcrypt para encriptar las contraseñas

const  UserSchema = new Schema ({// Defino que propiedades tendre en las notas
    name: { type: String, required: true}, //Name de tipo string y es obligatorio
    email: { type: String, require: true}, //Email de tipo string y es obligatorio
    password: { type: String, require: true}, //Password de tipo string y es obligatorio
    date: {type: Date, default: Date.now}, // Fecha de tipo fecha y brinda la fecha de carga
    tipo: {type: String, require: true} //Tipo de usuario (Recepcion, Administracion, Medicos, Enfermeria)
});

UserSchema.methods.encryptPassword = async (password) => { //Creo un metdo llamado encryptPassword
    const salt = await bcrypt.genSalt(10); //Ejecuto el algoritmo 10 veces y guardo el resultado (es la llave)
    const hash = bcrypt.hash(password,salt); //Con la llave encrypto y guardo
    return hash;
};

UserSchema.methods.matchPassword = async function (password){ //Creo un metodo para comparar las contraseñas, uso function en vez de => asi pueda utilizar una instancia de password
    return await bcrypt.compare(password,this.password); //Comparo la contraseña ingresada por el usuario con la del modelo de datos
};


module.exports = mongoose.model('User',UserSchema);//Exporto coleccion de datos Note con su estructura