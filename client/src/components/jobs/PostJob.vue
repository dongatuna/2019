<template>
    <section class="bg-light ">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-sm-10">                   
                    <h4 class="text-dark display-5" v-if="edit">Edit job post</h4> 
                    <h4 class="text-dark display-5" v-else>Post job opening</h4>
                    <form v-on:submit.prevent="postJob" class=" lead" ref="form" enctype="multipart/form-data" novalidate>
                        <div class="form-group">
                            <label for="topic"><strong>Job Post Title</strong></label>
                            <input v-if="edit" type="text" class="form-control form-control-lg" name="title" id="title" v-model="getPost.title" >
                            <input v-else type="text" class="form-control form-control-lg" name="topic" id="topic" v-model="newPost.title" >   
                            <span class="text-danger" v-if="(this.errors.title)"><small>{{errors['title']}}</small></span>                   
                        </div>
                            
                        <div class="form-group mb-3">
                            <label for="description"><strong>Description</strong></label>
                            <textarea v-if="edit" class="form-control" name="description" cols="30" rows="15" v-model="getPost.description"></textarea>
                            <textarea v-else class="form-control" name="description" cols="30" rows="15" v-model="newPost.description"
                            placeholder="Include a description of the job, day and times of this job opening, pay, benefits, etc."></textarea>
                            <span class="text-danger" v-if="(errors['description'])"><small>{{errors['description']}}</small></span>  
                        </div>    

                        <div class="form-group mb-3">
                            <label for="description"><strong>Requirements</strong></label>
                            <textarea v-if="edit" class="form-control" name="requirements" cols="30" rows="15" v-model="getPost.requirements"></textarea>
                            <textarea v-else class="form-control" name="requirements" cols="30" rows="8" v-model="newPost.requirements"
                            placeholder="Include job requirements and indicate whether you provide assistance helping prospects meet your requirements etc."></textarea>
                            <span class="text-danger" v-if="(errors['requirements'])"><small>{{errors['requirements']}}</small></span>  
                        </div> 
                        
                        <div class="form-group">
                            <label for="location"><strong>Location</strong></label>
                            <input v-if="edit" type="text" class="form-control" name="location" id="location" v-model="getPost.location">
                            <input v-else type="text" class="form-control" name="location" id="location" v-model="newPost.location">
                            <span class="text-danger" v-if="(errors['location'])"><small>{{errors['location']}}</small></span>  
                        </div>

                        <div class="form-group">
                            <label for="contact"><strong>Job Opening Contact</strong></label>
                            <input v-if="edit" type="text" class="form-control" name="contact" id="contact" v-model="getPost.contact">
                            <input v-else type="text" class="form-control" name="contact" id="contact" v-model="newPost.contact">
                            <span class="text-danger" v-if="(errors['contact'])"><small>{{errors['contact']}}</small></span>  
                            
                        </div>
                        
                        <div class="form-group text-info">
                            <!-- <label for="files"><strong>Share more about your job opening</strong></label>
                            <input type="file" multiple class="form-control-file" @change="onFileSelected()" name="fileattachments" ref="files" id="jobfiles"> -->
                        </div>   
                        <!-- <div class="m-3"> -->
                            <!-- <div v-if='edit'>
                                <div v-if="getPost.paths.length > 0">                           
                                    <ul v-for="(file, index) of getPost.paths" :key="index" class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <small>
                                                <div v-if="file[index]!=='' ">
                                                    {{file}}
                                                </div>                                           
                                            </small>
                                            <span class="badge badge-danger badge-pill"><a @click.prevent="removeAttachment(index)">X</a></span></li> 
                                        
                                    </ul>                                
                                </div>
                            </div>                      -->
                            <!-- <div v-if="files.length > 0 ">
                                <ul v-for="(file, index) of files[0]" :key="index" class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-center"><small>{{file.name}}</small>
                                       <span class="badge badge-danger badge-pill"><a @click.prevent="removeFile(index)">X</a></span> 
                                        <span class="badge badge-danger badge-pill"><a @click.prevent="removeFile(index)">X</a></span>
                                    </li>                        
                                </ul> 
                            </div>   -->
                        <!-- </div>  -->
                        <button v-if="edit" class="btn btn-primary btn-block py-3" type="submit"><strong>Update Job</strong> </button>
                        <button v-else class="btn btn-primary btn-block py-3" type="submit"><strong>Create Job</strong> </button>
                        
                    </form>
                </div>
            </div> 
        </div>
    </section>   
</template>

<script>
import { store } from "../../store/store"
import {mapGetters} from 'vuex'
export default {
    props:['edit', 'post'],

    computed:{
        ...mapGetters([        
            "getPost",   "getFiles", "getFilesNames"
        ])
    }, 
    
    data() {        
        return {     
               
            errors: [],    
            files: [], 
            paths: [], 
            newPost: {    
                contact: null,
                description: null,
                location: null,  
                requirements: null,   
                title: null, 
                // fileattachments: [],
                // paths:[]           
            }            
        }
    },

   
    methods: {
        // removeFile( num){
            
        //     this.files.splice(num, 1)
           
        //     //this.files.push(files)

        //     this.files
        //     //this.$store.commit('ADD_FILE_NAMES', files)  

        //     //this.files = files
        // },

        // removeAttachment( num){
            
        //     this.getPost.paths.splice(num, 1, undefined)

            

        //     this.$store.commit('ADD_POST', this.getPost)  
        // },

        // onFileSelected(){
        //    // console.log("This is the event", event)this.$refs.file.files[0]
        //     this.files.push(this.$refs.files.files)          
        // },

        checkForm() {
   
            this.errors = []

            if (!this.newPost.contact) {
                this.errors['contact'] = "Job contact is required."
            }

            if (!this.newPost.description) {
                this.errors['description'] = "Job description is required."
            }

            if (!this.newPost.location) {
                this.errors['location'] = "Job location is required."
            }         

            if (!this.newPost.requirements) {
                this.errors['requirements'] = "Job requirements is required."
            }

            if (!this.newPost.title) {
                this.errors['title'] = "Job title is required."
            }           

            if (this.errors.length == 0 &&
                this.newPost.title &&
                this.newPost.contact &&
                this.newPost.description &&
                this.newPost.location &&
                this.newPost.requirements
                
                //&& this.newPost.paths
            ){
                return true
            }
        },
    
        /*
        - Add the event to mutation, ADD_EVENT
        - data has not been sent to server (unpersisted data)
        */
        postJob() {     
            
           // const files = (this.files.length > 0) ? Array.from(this.files[0]) : []             

            this.newPost = this.edit ? Object.assign(this.getPost) : this.newPost      

            //Editing the post before saving it in the DB       
            if(this.checkForm()){    
                
                // if(files.length > 0 ){    

                //     this.$store.commit('ADD_FILES', files)                                       
                // }   



                this.$store.commit('CLEAR_POST')
                this.$store.commit("ADD_POST", this.newPost) 
                if(this.post||!this.newPost._id) {

                    this.$router.push({ name: 'previewJob' }) 

                } else {
                    
                    this.$router.push({ name: 'preview' }) 
                }
                
            }             
        }
    }
}
</script>


