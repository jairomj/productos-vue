<template>
    <div class="row mt-3">
        <div class="col-md-6 offset-md-1">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">Crear producto</div>
                <div class="card-body">
                    <form v-on:submit="guardar">
                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
                            <input type="text" v-model="name" id="nombre" class="form-control" maxlength="50" placeholder="nombre" required>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-comment"></i></span>
                            <input type="text" v-model="description" id="description" class="form-control" maxlength="150" placeholder="description" required>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
                            <input type="number" v-model="price" id="price" class="form-control" placeholder="precio" step="0.01" required>
                        </div>

                        <div class="d-grid col-6 mx-auto">
                            <button class="btn btn-success"><i class="fa-solid fa-floppy-disk">Guardar</i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { show_alert, enviarSolicitud } from '@/functions';
    export default{
        data(){
            return{
                name: '', 
                description: '',
                price: '',
                url: 'http://127.0.0.1:8000/api/products'
            }
        },
        methods: {
            guardar(){
                event.preventDefault();
                if(this.name.trim() === ''){
                    show_alert('Escribe el nombre', 'warning', 'name');
                }else if(this.description.trim() === ''){
                    show_alert('Escribe la descripcion', 'warning', 'description');
                }else if(this.price === ''){
                    show_alert('Escribe el precio', 'warning', 'price');
                }else{
                    var parametros = {name: this.name.trim(), description: this.description.trim(), price: this.price };
                    enviarSolicitud('POST', parametros, this.url, 'Productos guardados con exito' )
                }
            }
        }
    }
</script>