const express = require('express');
const controller = require('../controller/controller')
const rec = express.Router();

//links
rec.get('/',controller.index);
rec.get('/iniciasesion',controller.iniciar);
rec.get('/vistacliente',controller.comprador);
//rec.get('/informacion',controller.individual);
rec.post('/consulta',controller.login);
rec.post('/anadirvehiculo',controller.anadir);
rec.post('/actualizar',controller.actualizar);
rec.post('/eliminar',controller.eliminar);
rec.post('/filtro',controller.filtro);
rec.get('/cerrar',controller.cerrar);
rec.post('/actualizame',controller.actualizarven);
rec.get('/vendedor',controller.usuario);
rec.post('/vehiculo',controller.vehiculo);
rec.post('/upload',controller.actualizacion);

module.exports=rec;