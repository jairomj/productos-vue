<template>
<div class="row">
<div class="col-lg-8 offset-lg-2">
    <div class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead><tr><th>#</th><th>Name</th><th>Descripcion</th><th>Precio</th><th>Acciones</th></tr></thead>
            <tbody class="table-group-divider" id="contenido">
                <tr v-for="prod, i in products" :key="prod.id">
                    <td>{{ i+1 }}</td>
                    <td>{{ prod.name }}</td>
                    <td>{{ prod.description }}</td>
                    <td>{{ new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(prod.price)}}</td>
                    <td>
                        <router-link :to="{path: 'edit/'+prod.id}" class="btn btn-warning">
                            <i class="fa-solid fa-edit"></i>
                        </router-link>&nbsp;
                        <button class="btn btn-danger" @click="eliminar(prod.id, prod.name)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
import { confirmar } from '@/functions';

export default {
    data(){
        return {products:null}
    },
    mounted(){
        this.getProducts();
    },
    methods:{
        getProducts(){
        axios.get('http://127.0.0.1:8000/api/products').then(
            response => {
                this.products = response.data;
            }
        );

        },
        eliminar(id, name){
            confirmar(id, name);
        }
    }
    
}
</script>