<template>
    <section class="py-5 mt-5 bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center p-3">
                <div class="col-md-8 col-sm-10">
                <div class="card lead">
                    <div class="card-body">
                        <h4 class="card-title py-3"><strong>{{getJob.Title}}</strong></h4>
                        <h5 class="card-subtitle py-1"><strong>Location: </strong><span class="text-muted">{{getJob.Location}}</span> </h5>
                        <hr>
                            <p class="card-text">{{getJob.Description}}</p>
                            <p class="card-text">{{getJob.Requirements}}</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                        
                        <div class="row justify-content-between m-3">
                            <button class="btn btn-secondary col-md-3 col-sm-10" type="submit" v-on:click="editPost">Edit</button>
                            <button class="btn btn-primary col-md-3 col-sm-10" type="submit" v-on:click="addPost">Post</button>
                        </div>

                        <hr>

                        <div class="py-2 text-right">                    
                            <p class="px-3"><strong>Share on: </strong></p>
                            <a href="#"><i class="far fa-envelope fa-2x text-secondary mx-3"></i></a>
                            <a href="#"><i class="fab fa-facebook fa-2x text-primary mx-3"></i></a>                          
                        </div>                    
                    </div>
                </div>                
            </div>
        </div>
        </div>
        
    </section>    
</template>

<script>

import { mapGetters } from 'vuex'
import { store } from "../../store/store"

export default {
    data(){
        return{
            id: this.$route.params.id
        }
    },
    computed:{
        ...mapGetters([
            "getJob"
        ])
    },
    created(){
        this.$store.dispatch("getJobById", this.id)
    }
    
}
</script>

<style>
</style>