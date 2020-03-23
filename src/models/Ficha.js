const mongoose = require('mongoose');
const { Schema } = mongoose; //Necesito el esquema

const  FichaSchema = new Schema ({// Defino que propiedades tendre en las Ficha
    nro_ficha: {type: Number},//Nro de Ficha clinica del paciente
    fyh_in: {type: Date, default: Date.now}, //Fecha y hora de ingreso de la ficha
    user: {type: String}, //Usuario quien carga la ficha
    nombres: {type: String, require: true}, //Nombres del paciente
    apellidos: {type: String, require: true}, //Apellidos del paciente
    identificador: {type: String, require: true}, //Numero que identifica al paciente (DNI, LE, LC, LR)
    sexo: {type: String, require: true}, //Sexo del paciente
    fecha_nac: {type: Date, require: true}, //Fecha de nacimiento del paciente
    domicilio: {type: String, require: true}, //Domicilio del paciente (calle+nro+piso+dto)
    provincia: {type: String, require: true}, //Provincia donde vive el paciente
    localidad: {type: String, require: true}, //Localidad donde vive el paciente
    telefono: {type: String, require: true}, //Telefono del paciente
    id_obrasocial: {type: String, require: true}, //Obra social del paciente
    id_afiliado: {type: String}, //Numero de afiliado
    plan_os: {type: String }, // Plan de la obrasocial
    borrado: {type: Boolean}, //Identifica si el turno esta borrado
    quien_borro: {type: String} // Usuario quien borro el turno
});

module.exports = mongoose.model('Ficha',FichaSchema);//Exporto coleccion de datos Ficha con su estructura