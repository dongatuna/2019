<template>
    <section class="bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-sm-10" >
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
                            
                             <!-- {{files}} -->
                            <!-- <h5 class="card-subtitle py-1 "><strong>Attachments </strong></h5><br> -->
                             <!-- <div class="m-3">

                                      
                                <div v-if="getPost.paths.length > 0">                                                    
                                    <ul v-for="(file, index) of getPost.paths" :key="index" class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center"><small>{{file}}</small></li> 
                                    </ul>
                                </div>
                                
                            
                            
                            <div v-if ="getFiles.length > 0 ">
                                <ul v-for="(file, index) of getFiles" :key="index" class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-center"><small>{{file.name}}</small></li>                        
                                </ul> 
                            </div>  
                        </div>  -->
                            
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
    props:['edit', 'repost'],

    computed:{
        ...mapGetters([        
            "getPost"
        ])      
    }, 

    data(){
        return{
            //files: this.getFiles
        }
    },

    // mounted(){
    //     return this.getPost
    // },

    methods:{    
        

        async addPost(){ 
            
            debugger

            if (this.edit && !this.repost) {

                debugger
                await this.$store.dispatch('editPost', this.getPost) 

                this.$router.push({name: "listJobs"}) 
            } else {
                this.$router.push({name: "checkout"}) 
            }
                     
        },

        editPost(){
            
            // if(this.getPost._id){
            //     this.$store.dispatch("getPostById", this.getPost._id)
            // }else {

            // }
           

            this.$router.push({path: "/editjob"})
        }
    }
    
}
</script>

<style scoped>

.card-text {
    white-space: pre-wrap;
}

</style>
