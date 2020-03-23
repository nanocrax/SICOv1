const mongoose = require('mongoose');
const { Schema } = mongoose; //Necesito el esquema

const  NoteSchema = new Schema ({// Defino que propiedades tendre en las notas
    title: { type: String, required: true}, //Titulo de tipo string y es obligatorio
    description: { type: String, require: true}, //Descripcion de tipo string y es obligatorio
    date: {type: Date, default: Date.now}, // Fecha de tipo fecha y brinda la fecha de carga 
    user: {type: String} //String para enlazar el usuario con su nota
});

module.exports = mongoose.model('Note',NoteSchema);//Exporto coleccion de datos Note con su estructura