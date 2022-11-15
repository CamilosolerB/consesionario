$(document).ready(function(){

    $('.btnup').on('click',function(){

        let btn=$('.btnup').index(this);
        //let identificacion=('.identificacion').eq(btn)
        let placa=$('.placa').eq(btn);
        let modelo=$('.modelo').eq(btn);
        let marca=$('.marca').eq(btn);
        let estado=$('.estado').eq(btn);
        let precio=$('.precio').eq(btn);

        //let i=identificacion.val();

        let pl=placa.val();
        let m=modelo.val();
        let ma=marca.val();
        let e=estado.val();
        let p=precio.val();
        alert(m+"\n"+ma+"\n"+e+"\n"+p)
        data = {
                plpl:pl,mm:m,mama:ma,ee:e,pp:p
            }
        
        fetch('/actualizar',{
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        })
    })


    $('.btndel').on('click',function(){
        alert('borrado')
        let btn=$('.btndel').index(this);
        let placa=$('.placa').eq(btn);
        let modelo=$('.modelo').eq(btn);
        let marca=$('.marca').eq(btn);
        let estado=$('.estado').eq(btn);
        let precio=$('.precio').eq(btn);

        let pl=placa.val();
        let m=modelo.val();
        let ma=marca.val();
        let e=estado.val();
        let p=precio.val();
        
        $.ajax({

            type:'POST',
            url:'/eliminar',
            data:{
                plpl:pl,mm:m,mama:ma,ee:e,pp:p
            }

        })
    })

    $('.Actualiza').on('click',function(){
        
        let nom,cla;

        alert("Por temas de seguridad tenemos que verificar que seas tu");
        nom=prompt("Indique su identificacion")
        cla=prompt("Indique su contraseña");

        $.ajax({
            Type:"GET",
            url:"/actualizame",
            data:{
                nn:nom,cc:cla
            }

        })

    })
})
