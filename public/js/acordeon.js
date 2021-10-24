$(document).ready(function(){
    
    $('.upload').on('click',function(){
        alert('funciona')
        let btn=$('.upload').index(this)

        let placa=$('.placa').eq(btn);

        let pl=placa.val()

        alert(pl)

    })

})
