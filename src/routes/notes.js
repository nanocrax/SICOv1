// Aqui iran las url o rutas en donde el usuario modificara sus notas

const express = require('express'); //Metodo que me permite generar rutas
const router = express.Router();

const Note = require('../models/Note.js'); //Busco la estructura creada en Note.js
const { isAuthenticated } = require('../helpers/auth.js'); //Necesito el helper para hacer autenticaciones

router.get('/notes/add', isAuthenticated,(req,res)=>{ //Ruta para obtener la vista
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req,res)=>{ //Ruta para recibir los datos del formulario (le coloco async para avisarle al codigo que dentro habra alguna tarea que se tenga que ejecutar asincronamente >tarea con await)
    const {title, description} = req.body; //Obtengo el titulo y la descripcion del requrimiento
    const errors = [];
    if(!title){
        errors.push({text: 'Por favor inserte un titulo'});
    }
    if(!description){
        errors.push({text: 'Por favor escriba una descripcion'});
    }
    if(errors.length > 0){
        res.render('notes/new-note',{
            errors,
            title,
            description
        });
    }else{
        //No hay errores, ahora a guardar
        const newNote = new Note({title,description}); //Nota nueva con el titulo y descripcioon sacados de los formularios
        newNote.user = req.user.id; //Guardo el id del usuario que esta almacenado globalmente en la base de datos
        await newNote.save(); //Guardo en base de datos asincronamente (por esto se coloca await para decirle al codigo que este metodo es asincrono osea que el servidor no tendra que esperar a que se termine al tarea)
        req.flash('success_msg', "Nota creada correctamente");//envio por flash un mensaje
        res.redirect('/notes'); //Redireciono a otra ruta
    }
});

router.get('/notes',isAuthenticated,async (req,res)=>{
    //Vamos a consultar la base de datos
    const notes = await Note.find({user: req.user.id}).sort({date: 'desc'}); //Busco todos los datos que sean del usuario en especifico y los ordeno de manera desendente por fecha 
    res.render('notes/all-notes',{notes});
});

router.get('/notes/edit/:id',isAuthenticated, async (req,res)=>{ //Cuando el usurio requiera algo utilizando /notes/edit/id 
    const note = await Note.findById(req.params.id); // tomo el id, consulto en la base de datos y lo guardo en una constante
    res.render('notes/edit-notes', {note}); //luego renderizo una vista utilizando ese elemento 
});

router.put('/notes/edit-note/:id',isAuthenticated, async (req,res)=>{
    const {title,description} = req.body;
    await Note.findByIdAndUpdate(req.params.id,{title,description});
    req.flash('success_msg', "Nota editada correctamente");//envio por flash un mensaje
    res.redirect('/notes');
});

router.delete('/notes/delete/:id',isAuthenticated, async (req,res) =>{
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', "Nota eliminada correctamente");//envio por flash un mensaje
    res.redirect('/notes');
});

module.exports=router;