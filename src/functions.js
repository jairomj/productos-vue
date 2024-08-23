import Swal from "sweetalert2";
import axios from "axios";

export function show_alert(messaje, icono, foco=''){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:messaje,
        icon: icono,
        customClass: {confirmButton: 'btn btn-primary', popup: 'animated zoomin'},
        buttonsStyling: false
    });
}

export function confirmar(id,name){
    var url = 'http://127.0.0.1:8000/api/products/'+id;
    const swalWithBootstrapButtons= Swal.mixin({
        customClass:{confirmButton: 'btn btn-success ma-3', cancelbutton: 'btn btn-danger'}
        ,buttonsStyling:false
    });
    swalWithBootstrapButtons.fire({
        title: 'Seguro de eliminar el producto'+ name,
        text: 'Se perdera la informacion del producto',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check">Si, eliminar</i>',
        cancelButtonText: '<i class="fa-solid fa-ban">Cancelar</i>'}).then((result)=>{
            if(result.isConfirmed){
                enviarSolicitud('DELETE', {id:id},url, 'Producto eliminado');
            }else{
                show_alert('Operacion cancelada', 'info')
            }
        })
}
export function enviarSolicitud(metodo, parametros, url, mensaje){
    axios({method: metodo, url:url, data:parametros}).then(function(respuesta){
        var status = respuesta.data[0]['status'];
        if(status==='success'){
            show_alert(mensaje,status);
            window.setTimeout(function(){
                window.location.href='/';
            },1000)
        }else{
            var listado='';
            var errores = respuesta.data[1]['errors'];
            Object.keys(errores).forEach(
                key => listado != errores[key][0]+'.'
            );
            show_alert(listado, 'error');
        }
    }).catch(function(error){
        show_alert('Error en la solicitud', 'error');
    });

}