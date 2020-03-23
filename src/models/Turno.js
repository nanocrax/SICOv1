const mongoose = require('mongoose');
const { Schema } = mongoose; //Necesito el esquema

const  TurnoSchema = new Schema ({// Defino que propiedades tendre en las turnos
    fyh_in: {type: Date, default: Date.now}, //Fecha y hora de ingreso del turno
    fyh_turno: {type: Date, require: true}, //Fecha y hora de el turno
    user: {type: String, require: true}, //Usuario quien carga el turno
    nro_ficha: {type: Number},//Nro de Ficha clinica del paciente
    medico1: {type: String}, //Medico principal
    medico2: {type: String}, //Medico secundario
    tipo_atencion: {type: String},  //Identifica si es consulta o algun estudio
    estado: {type: String}, //Diferencia el estado del turno (Reservado-Efectivo)
    fyh_llegada: {type: Date}, //Fecha y hora en que el paciente es atendido por la recepcionista
    fyh_atencion: {type: Date}, //Fecha y hora en que el paciente es atendido por el doctor
    borrado: {type: Boolean}, //Identifica si el turno esta borrado
    quien_borro: {type: String} // Usuario quien borro el turno
});

module.exports = mongoose.model('Turno',TurnoSchema);//Exporto coleccion de datos Turno con su estructura