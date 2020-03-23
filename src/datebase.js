//Conexion a la base de datos

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notes-db-app',{ //Coloco el nombre de la app 
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db=>console.log('DB is connected')) //en caso de que se haya conectado correctamente enviar mensaje
    .catch(err => console.error(err));

