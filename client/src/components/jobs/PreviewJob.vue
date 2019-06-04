<template>
    <section class="py-5 mt-5 bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center p-3">
                <div class="col-md-8 col-sm-10" >
                    <div class="card lead">
                        <div class="card-body">
                            <h4 class="card-title py-3"><strong>{{getJob.title}}</strong></h4>                            
                            
                            <h5 class="card-subtitle py-1"><strong>Location: </strong><span class="text-muted">{{ getJob.location }}</span> </h5>
                            <br>
                            <h5 class="card-subtitle py-1 "><strong>Description </strong></h5>
                            <hr>
                                <p class="card-text">{{ getJob.description }}</p>                            
                            <hr>
                            <hr>
                                <p class="card-text">{{ getJob.requirements }}</p>                            
                            <hr>

                            <div class="row justify-content-between m-3" v-if="getJob.jobfiles.length>0">
                                <p v-for="(job, index) of getJob.eventfiles" :key="index">{{job}}</p>
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
            "getJob",
            "getFiles",
            "updatedUser"
        ])      
    }, 
    methods:{
        getFormData(obj) {
            const formData = new FormData()
            Object.keys(obj).forEach(key => formData.append(key, obj[key]))
            return formData
        },
        addPost(){            
             
            const formDBData = this.getFormData(this.getEvent)
            debugger
            if(this.getFiles.length>0){
                
                for(let key of this.getFiles){
                    for(let singleFile of key){
                        formDBData.append("eventfiles", singleFile)
                    }                                                     
                } 
                
                Array.from(this.getFiles).forEach(file=>{
                    formDBData.append("eventfiles", file)
                })
                let uploadedfiles = this.getFiles.length;
                for (let e_file = 0; e_file < uploadedfiles; e_file++) {
                    formDBData.append("eventfiles", this.getFiles[e_file])
                }
                debugger
                //this.$store.dispatch('addDBEvent', formDBData)
            }
            
            debugger
            this.$store.dispatch('addPost', formDBData)
            
            debugger
            
            this.$router.push({path: '/admin'})
        },

        editPost(){
            this.$router.push({path: '/editjob'})
        }
    }
    
}
</script>

<style>
</style>