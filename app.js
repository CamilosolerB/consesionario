//importacion de las librerias
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mod = express();
const bcryptjs = require('bcryptjs');
const session = require('express-session');


//ejecutor automatico
mod.use(morgan('dev'));

//Uso de express e implementacion del embedden template
mod.use(express.static(path.join(__dirname,'public')));
mod.set('view engine','ejs');
mod.set('views',path.join(__dirname,'views'));

//uso de sesiones
mod.use(
    session({
        resave:true,
        saveUninitialized:true,
        secret:'123'
    })
)

mod.use(express.urlencoded({extended:true}));
mod.use(require('./routes/routes'));
mod.use=(err,req,res,next)=>{
    res.send({err:err.message})
}

//servidor

mod.set('port',process.env.PORT || 4000);

mod.listen(mod.get('port'),()=>{
    console.log(`Conectado servidor: ${mod.get('port')}`);
})

