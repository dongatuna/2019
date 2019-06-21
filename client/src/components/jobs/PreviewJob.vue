<template>
    <section class="bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-sm-12" >
                    <div class="card lead">
                        <div class="card-body">
                            <h4 class="card-title py-3"><strong>{{getPost.title}}</strong></h4>                            
                            
                            <h5 class="card-subtitle py-1"><strong>Location: </strong><span class="text-muted">{{ getPost.location }}</span> </h5>
                            <br>
                            <h5 class="card-subtitle py-1"><strong>Contact: </strong><span class="text-muted">{{ getPost.contact }}</span> </h5>
                            <br>
                            <h5 class="card-subtitle py-1 "><strong>Description </strong></h5>
                            <hr>
                                <p class="card-text">{{ getPost.description }}</p>                            
                            <hr>
                            <h5 class="card-subtitle py-1 "><strong>Requirements </strong></h5>
                            <hr>
                                <p class="card-text">{{ getPost.requirements }}</p>                            
                            <hr>
                            <!-- {{getFilesNames[0]}} {{files}} -->
                            <h5 class="card-subtitle py-1 "><strong>Attachments </strong></h5><br>
                            <div class="row m-3" v-if="getFilesNames.length>0">                           
                                
                                <p v-for="(file, index) of getFilesNames" :key="index">{{file}}</p>
                            </div>
                            <div v-else>
                                <p>No attachments</p>
                            </div>
                            <hr>

                            <div class="row justify-content-between m-3">
                                <button class="btn btn-secondary col-md-3 col-sm-10" type="submit" v-on:click="editPost">Edit</button> 
                                <button class="btn btn-primary col-md-3 col-sm-10" type="submit" v-on:click="addPost">Post</button>
                            </div>

                            <hr>   
                        </div>
                    </div>                
                </div>
            </div>
        </div>        
    </section>    
</template>

<script>
import { store } from "../../store/store"
import {mapGetters} from 'vuex'
export default {   
    props: ['edit'],

    computed:{
        ...mapGetters([        
            "getPost", "getFiles", "getFilesNames"
        ])      
    }, 

    data(){
        return{
            files: this.getFilesNames||[]
        }
    },

    methods:{
      
        getFormData(obj) {
            const formData = new FormData()
            Object.keys(obj).forEach(key => formData.append(key, obj[key]))
            return formData
        },
        addPost(){            
             
            const formData = this.getFormData(this.getPost)
            debugger
            if(this.getFiles.length>0){             
                
                Array.from(this.getFiles).forEach(file=>{
                    formData.append("fileattachments", file)
                })              
            }
            
            debugger
            this.$store.dispatch('addPost', formData)
            
            debugger
            
            this.$router.push({path: '/adminjobs'})
        },

        editPost(){
            this.$router.push({path: '/editjob'})
        }
    }
    
}
</script>

<style>
</style>