<template>
    <section class="bg-light ">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-10 col-sm-10">                   
                    <h4 class="text-dark display-5" v-if="edit">Edit Job Post</h4> 
                    <h4 class="text-dark display-5" v-else>Share Your Job Opening</h4>
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
                            placeholder="Include description, day and times of this job opening"></textarea>
                            <span class="text-danger" v-if="(errors['description'])"><small>{{errors['description']}}</small></span>  
                        </div>    

                        <div class="form-group mb-3">
                            <label for="description"><strong>Requirements</strong></label>
                            <textarea v-if="edit" class="form-control" name="requirements" cols="30" rows="15" v-model="getPost.requirements"></textarea>
                            <textarea v-else class="form-control" name="requirements" cols="30" rows="5" v-model="newPost.requirements"
                            placeholder="Include job requirements and indicate whether you provide training assistance and resources"></textarea>
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
                            
                        </div>
                        
                        <div class="form-group text-info">
                            <label for="files"><strong>Share more about your job opening</strong></label>
                            <input type="file" multiple class="form-control-file" @change="onFileSelected()"  ref="files" id="jobfiles">
                        </div>   
                        <div v-if="edit" class="col-sm-12 mb-3">
                            <div v-if="getPost.fileattachments.length>0">                           
                                
                                <p v-for="(file, index) of getPost.fileattachments" :key="index">{{file}}</p>
                            </div>
                            <div v-else>
                                <p>No attachments</p>
                            </div>
                        </div>  
                        
                        <div class="col-sm-12 mb-3">
                            <ul v-for="(file, index) of files[0]" :key="index" class="list-group list-group-flush">
                                <li class="list-group-item d-flex justify-content-between align-items-center">{{file.name}}
                                    <!-- <span class="badge badge-danger badge-pill"><a @click.prevent="removeFile(index)">X</a></span> -->
                                </li>                        
                            </ul> 
                        </div>  
                     
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
    props:['edit'],
    computed:{
        ...mapGetters([        
            "getPost", "getFiles", "getFilesNames"
        ])      
    }, 
    
    data() {        
        return {     
               
            errors: [],    
            files: [],  
            newPost: {    
                contact: null,
                description: null,
                location: null,  
                requirements: null,   
                title: null,            
            }            
        }
    },

    methods: {

        getFormData(obj) {
            const formData = new FormData()
            Object.keys(obj).forEach(key => formData.append(key, obj[key]))
            return formData
        },
        
        onFileSelected(){
           // console.log("This is the event", event)this.$refs.file.files[0]
            this.files.push(this.$refs.files.files)          
        },
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
            ){
                return true
            }
        },
    
        /*
        - Add the event to mutation, ADD_EVENT
        - data has not been sent to server (unpersisted data)
        */
        postJob() {     
            this.newPost = Object.assign(this.getPost)
            //this.newPost = this.getPost
            if(this.checkForm()){
               
                console.info("This is the new post ", newPost)
                debugger
                const files = this.files[0]
            //Editing the post before saving it in the DB       
                if(this.edit){                    
                    //this post exists in the DB
                    if(this.newPost._id) {
                        debugger
                        console.info("Is this the problem ", this.getPost.fileattachments.length)
                        //assign getPost from the store to the new job   
                        if(this.newPost.fileattachments.length>0||files.length > 0){
                            
                            const uploaded_files = Array.from(files.concat(this.getFilesNames))
                        
                            this.$store.commit('ADD_FILES', uploaded_files)                 
                        }
                        
                    }else{
                        //this post is only in the vuex store, i.e., not in DB
                        //const formData = this.getFormData(this.newPost)
                        if(this.getFilesNames.length>0||files.length > 0){                                         
                            
                            const uploaded_files = Array.from(files.concat(this.getFilesNames))
                            
                            this.$store.commit('ADD_FILES', uploaded_files)                                  
                        }                                                   
                    }   
                                    

                } else{                
                    //Add the post for the first time                    
                    if (this.newPost !== null) {
                        
                        const files = this.files[0]
                        if( files.length > 0){  

                            this.$store.commit('ADD_FILES', files)
                                    
                        }               
                    }          
                }
                this.$store.commit("ADD_POST", this.newPost) 
                this.$router.push({ name: 'previewJob' })
            }
        }
    }
}
</script>