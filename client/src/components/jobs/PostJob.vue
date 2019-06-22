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
                            <input v-else type="text" class="form-control form-control-lg" name="topic" id="topic" v-model="newJob.title" >   
                            <span class="text-danger" v-if="(this.errors.title)"><small>{{errors['title']}}</small></span>                   
                        </div>
                            
                        <div class="form-group mb-3">
                            <label for="description"><strong>Description</strong></label>
                            <textarea v-if="edit" class="form-control" name="description" cols="30" rows="15" v-model="getPost.description"></textarea>
                            <textarea v-else class="form-control" name="description" cols="30" rows="15" v-model="newJob.description"
                            placeholder="Include description, day and times of this job opening"></textarea>
                            <span class="text-danger" v-if="(errors['description'])"><small>{{errors['description']}}</small></span>  
                        </div>    

                        <div class="form-group mb-3">
                            <label for="description"><strong>Requirements</strong></label>
                            <textarea v-if="edit" class="form-control" name="requirements" cols="30" rows="15" v-model="getPost.requirements"></textarea>
                            <textarea v-else class="form-control" name="requirements" cols="30" rows="5" v-model="newJob.requirements"
                            placeholder="Include job requirements and indicate whether you provide training assistance and resources"></textarea>
                            <span class="text-danger" v-if="(errors['requirements'])"><small>{{errors['requirements']}}</small></span>  
                        </div> 
                        
                        <div class="form-group">
                            <label for="location"><strong>Location</strong></label>
                            <input v-if="edit" type="text" class="form-control" name="location" id="location" v-model="getPost.location">
                            <input v-else type="text" class="form-control" name="location" id="location" v-model="newJob.location">
                            <span class="text-danger" v-if="(errors['location'])"><small>{{errors['location']}}</small></span>  
                        </div>

                        <div class="form-group">
                            <label for="contact"><strong>Job Opening Contact</strong></label>
                            <input v-if="edit" type="text" class="form-control" name="contact" id="contact" v-model="getPost.contact">
                            <input v-else type="text" class="form-control" name="contact" id="contact" v-model="newJob.contact">
                            
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
            "getPost", "getFiles"
        ])      
    }, 
    
    data() {        
        return {     
               
            errors: [],    
            files: [],  
            newJob: {    
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

            if (!this.newJob.contact) {
                this.errors['contact'] = "Job contact is required."
            }

            if (!this.newJob.description) {
                this.errors['description'] = "Job description is required."
            }

            if (!this.newJob.location) {
                this.errors['location'] = "Job location is required."
            }         

            if (!this.newJob.requirements) {
                this.errors['requirements'] = "Job requirements is required."
            }

            if (!this.newJob.title) {
                this.errors['title'] = "Job title is required."
            }           

            if (this.errors.length == 0 &&
                this.newJob.title &&
                this.newJob.contact &&
                this.newJob.description &&
                this.newJob.location &&
                this.newJob.requirements
            ){
                return true
            }
        },
    
        /*
        - Add the event to mutation, ADD_EVENT
        - data has not been sent to server (unpersisted data)
        */
        postJob() {     
            //Editing the post before saving it in the DB       
            if(this.edit){
                //assign getPost from the store to the new job
                //this post exists in the DB
                if(this.getPost._id) {
                    this.newJob = Object.assign(this.getPost)
                    debugger

                    if(this.newJob.fieattachments.length>0){
                        
                    }
                }
                debugger
                //get the files that have been pushed into the data files array
                if(this.files.length>0) { const job_files = Array.from(this.files[0]) }
                debugger
                //since, this is editing, there might be files in the vuex store
                if(this.getFiles.length>0) { const attached_files = Array.from(this.getFiles) }
                debugger
                //if either, getFiles (in vuex store) or files in the data, concat them.  Concating with an empty array is not an issue
                if(this.getFiles.length>0||this.files.length>0 ) {const files = job_files.concat(attached_files)}

                debugger
                if (this.checkForm()) {

                    const formData = this.getFormData(this.newJob)

                    debugger
                    if( this.getFiles.length>0||this.files.length>0 ){                
                        debugger
                        Array.from(files).forEach(file => {
                   
                            formData.append('fileattachments', file  )
                        })   
                        
                        
                    }

                    //This checks if the editing is for a new or for a created post
                    if(this.newJob._id){
                        this.$store.dispatch('editPost', {data: formData, id: this.newJob._id})
                    }else{
                        this.$store.dispatch('addPost', formData)
                    }    

                    this.$router.push({ name: 'adminJob' })                   
                    
                }
            } else{                
                //Add the post for the first time
                
                if (this.checkForm() && this.newJob !== null) {
                    
                    const files = this.files[0]
                           
                    debugger
                    this.$store.commit('ADD_POST', this.newJob)

                    if( files.length > 0){                
                        
                        //Array.from(files).forEach(file => {
                           
                            //console.info("What is in the file? ", file)
                            debugger
                            //formData.append('fileattachments', file  )

                            this.$store.commit('ADD_FILES', files)
                        //})         
                    }

                    this.$router.push({ name: 'previewJob' })
             
                }          
            }
        }
    }
}
</script>