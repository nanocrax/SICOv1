//Archivo principal 
const express = require('express');
const path = require('path'); //necesario para localizar cualquier archivo que no este en el directorio raiz
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash'); //para enviar mensajes entre vistas
const passport = require('passport');

//Inicializaciones
const app = express(); //Iniciamos express
require('./datebase'); //Indicamos donde esta el archivo para conectarse a la base de datos
require('./config/passport'); //Iniciamos passport


//Configuracion
app.set('port',process.env.PORT || 3000); //puerto del servidor o el 3000
app.set('views',path.join(__dirname,'views'));//Aqui le damos la direccion para poder encontrar los archivos html 
app.engine('.hbs',exphbs({
    defaultLayout: 'main', //layout por defecto
    layoutsDir: path.join(app.get('views'),'layouts'), //directorio
    partialsDir: path.join(app.get('views'),'partials'), // archivo en donde estaran las vistas parciales
    extname: '.hbs' //defino que extension tendran nuestros archivos
})); //determino el motor de plantillas

app.set('view engine','.hbs'); //Definimos que motor de vistas vamos a utilizar

//Middlewares (Todo lo que debe ser ejecutado antes de pasarcelo a las rutas)
app.use(express.urlencoded({extended: false})); //necesario para que pueda entender los datos de un formulario (como aceptare solo datos pongo en false)
app.use(methodOverride('_method')); //Modulo que se encarga de mirar los input ocultos 
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));//Configuraciones por defecto para la sesion
app.use(passport.initialize());//Inicializamos Passport
app.use(passport.session());//Le dicimos a passport que use la sesion ya configurada
app.use(flash()); //Iniciamos flash para los mensajes

// Variables Globales (Datos que toda la aplicacion podra acceder)
app.use((req,res,next)=>{//variables necesarias para almacenar los mensajes flash y asi se pueda ver en ventanas diferentes
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); //Para mensajes de passport que se llaman error
    res.locals.user = req.user || null; //Para poder mostrar un mensaje de bienvenida, mostrarle determinadas rutas y demas
    next();
});

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
app.use(require('./routes/turnos'));
app.use(require('./routes/pacientes'));


//Archivos Estaticos
app.use(express.static(path.join(__dirname,'public')));


//Inicializador de servidor o listening
app.listen(app.get('port'),()=>{
    console.log('Servidor iniciado en puerto', app.get('port'));
});