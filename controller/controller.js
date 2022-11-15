const connection = require('../conmysql/conection')
const con = connection();
const bcryptjs = require('bcryptjs');
const controller={}

controller.index=(req,res,next)=>{
    res.render('index')
}
controller.iniciar=(req,res,next)=>{
    res.render('login')
}
controller.comprador=(req,res,next)=>{
    con.query('SELECT * FROM datospersonales INNER JOIN vehiculo on (ID_data=datid) INNER JOIN categoria on (catid=catide)',(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.render('comprador',{datos:resbb})
        }
    })
}
controller.usuario=(req,res,next)=>{
    con.query('SELECT * FROM vehiculo INNER JOIN categoria on (catid=catide) GROUP BY catipo',(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.render('vendedor',{datos:resbb})
            console.log(resbb)      
        }
    })
}

controller.login=async(req,res,next)=>{
    const usu=await req.body.usuario;
    const pass=await req.body.password;
    con.query('SELECT * FROM usuario INNER JOIN datospersonales on (ID_Usuario=ID_Usud) INNER JOIN usuario_rol on (ID_Usuario=ID_Usu) INNER JOIN rol on (ID_Rol=ID_Rolo) WHERE login=? AND Clave=?',[usu,pass],(err,results)=>{
        if(err){
            next(new Error("Error en la consulta login:" +err));
        }
        else if(results!=0){


        console.log("Validando datos")

            rol=results[0].Rol_tipo;
            data=results[0].ID_data;
            req.session.identificacion = data;
            console.log(rol)
            console.log(data)
            switch(rol){
                case "Vendedor":
                    req.session.login=true; 
                    if(req.session.login){  
                            con.query('SELECT * FROM datospersonales INNER JOIN vehiculo on (ID_data=datid) INNER JOIN categoria on (catid=catide) WHERE ID_data=?',[data],(err,resbb)=>{
                                if(err){
                                    next(new Error(err))
                                    //INNER JOIN datospersonales on (ID_Usuario=ID_Usu)
                                }
                                else{
                                    console.log(resbb)
                                    res.render('menuempleado',{datos:resbb})
                                }    
                            })
                            
    
                        }
                    break;

                case "Comprador":
                        res.redirect('vistacliente')
                break;
            }     
        }
        else{
            console.log("Datos incorrectos");
            res.redirect('/iniciasesion',);
        }
    })
}

controller.anadir=(req,res,next)=>{
    const p = req.body.Placa_veh;
    const i = req.session.identificacion;
    const c = req.body.categoria;
    const m = req.body.modelo;
    const ma = req.body.marca;
    const e = req.body.estado;
    const pr = req.body.precio;

    con.query('INSERT INTO vehiculo SET?',{Placa_veh:p,datid:i,catid:c,modelo:m,marca:ma,estado:e,precio:pr},async(err)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Insertado");
            res.redirect('vendedor')
        }
    })
}

controller.actualizar=(req,res,next)=>{
   const plax=req.body.plpl;
   const modx=req.body.mm;
   const marx=req.body.mama;
   const estx=req.body.ee;
   const prex=req.body.pp;
    con.query('UPDATE vehiculo SET modelo="'+modx+'",marca="'+marx+'",estado="'+estx+'",precio="'+prex+'" WHERE Placa_veh="'+plax+'"',(err)=>{
        if(err){
            next(new Error(err))
        }
        else{
            console.log("Actualizado");
            res.redirect('vendedor');
        }   
    })
}
controller.eliminar=(req,res,next)=>{
    const placx=req.body.plpl;
    con.query('DELETE FROM vehiculo WHERE Placa_veh="'+placx+'"',(err)=>{
        if(err){
            next(new Error(err))
        }
        else{
            console.log('Eliminado')
        }
    })
}

controller.filtro=(req,res,next)=>{
    const mm=req.body.maximo;
    const mi=req.body.minimo;
    const ca=req.body.categoria;
    con.query('SELECT * FROM vehiculo INNER JOIN categoria ON (catid=catide) WHERE precio>=? AND precio<=? OR catide=?',[mi,mm,ca],(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{
            console.log('consulta hecha')
            //res.redirect('vistacliente')
            res.render('comprador',{datos:resbb})
            console.log(resbb)
        }
    })
}

controller.actualizarven=(req,res,next)=>{
    const idx=req.body.documento;
    con.query('SELECT * FROM datospersonales INNER JOIN vehiculo on (ID_data=datid) INNER JOIN categoria ON (catid=catide) WHERE Numero_ID=?',[idx],(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.render('datosindi',{datos:resbb})
            console.log('redirigiendo')
        }
    })
}

controller.actualizacion=(req,res,next)=>{
    const idx = req.body.ID_data;
    const nom = req.body.nombre;
    const ape = req.body.apellido;
    const tel = req.body.telefono;
    const cor = req.body.correo;

    console.log('preconsulta')

    con.query('UPDATE datospersonales SET nombre="'+nom+'",apellido="'+ape+'",Telefono="'+tel+'",correo="'+cor+'" WHERE ID_data="'+idx+'"',(err)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.redirect('vendedor')
        }
    })
}

controller.vehiculo=(req,res,next)=>{
    const plax=req.body.placa;
    con.query('SELECT * FROM datospersonales INNER JOIN vehiculo ON (ID_data=datid) INNER JOIN categoria ON (catid=catide) WHERE Placa_veh=?',[plax],(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{
            console.log(plax)
            res.render('vehiculo',{datos:resbb})
            console.log(resbb)
        }
    })
}


controller.cerrar=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}



module.exports=controller;
