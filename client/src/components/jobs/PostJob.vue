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
                            <input v-if="edit" type="text" class="form-control form-control-lg" name="title" id="title" v-model="getJob.title" >
                            <input v-else type="text" class="form-control form-control-lg" name="topic" id="topic" v-model="newJob.title" >   
                            <span class="text-danger" v-if="(this.errors.title)"><small>{{errors['title']}}</small></span>                   
                        </div>
                            
                        <div class="form-group mb-3">
                            <label for="description"><strong>Description</strong></label>
                            <textarea v-if="edit" class="form-control" name="description" cols="30" rows="15" v-model="getJob.description"></textarea>
                            <textarea v-else class="form-control" name="description" cols="30" rows="15" v-model="newJob.description"
                            placeholder="Include description, day and times of this job opening"></textarea>
                            <span class="text-danger" v-if="(errors['description'])"><small>{{errors['description']}}</small></span>  
                        </div>    

                        <div class="form-group mb-3">
                            <label for="description"><strong>Requirements</strong></label>
                            <textarea v-if="edit" class="form-control" name="requirements" cols="30" rows="15" v-model="getJob.requirements"></textarea>
                            <textarea v-else class="form-control" name="requirements" cols="30" rows="5" v-model="newJob.requirements"
                            placeholder="Include job requirements and indicate whether you provide training assistance and resources"></textarea>
                            <span class="text-danger" v-if="(errors['requirements'])"><small>{{errors['requirements']}}</small></span>  
                        </div> 
                        
                        <div class="form-group">
                            <label for="location"><strong>Location</strong></label>
                            <input v-if="edit" type="text" class="form-control" name="location" id="location" v-model="getJob.location">
                            <input v-else type="text" class="form-control" name="location" id="location" v-model="newJob.location">
                            <span class="text-danger" v-if="(errors['location'])"><small>{{errors['location']}}</small></span>  
                        </div>

                        <div class="form-group">
                            <label for="contact"><strong>Job Opening Contact</strong></label>
                            <input v-if="edit" type="text" class="form-control" name="contact" id="contact" v-model="getJob.contact">
                            <input v-else type="text" class="form-control" name="contact" id="contact" v-model="newJob.contact">
                            
                        </div>
                        
                        <div class="form-group text-info">
                            <label for="files"><strong>Share more about your job opening</strong></label>
                            <input type="file" multiple class="form-control-file" @change="onFileSelected()"  ref="files" id="jobfiles">
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
            "getUserId"
        ])      
    }, 
    
    data() {        
        return {     
               
            errors: [],    
            files: [],  
            selectedFiles: "",                    
            newJob: {                            
                title: null,
                description: null,
                requirements: null,
                location: null, 
                contact: null,
                                                          
            }            
        };
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
            this.selectedFiles  = this.$refs.files.files
        },
        checkForm() {
   
            this.errors = []

            if (!this.newJob.title) {
                this.errors['title'] = "Job title is required."
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

            if (this.errors.length == 0 &&
                this.newJob.title &&
                this.newJob.description &&
                this.newJob.location &&
                this.newJob.requirements
            ){
                return true;
            }
        },
    
        /*
        - Add the event to mutation, ADD_EVENT
        - data has not been sent to server (unpersisted data)
        */
        postJob() {            
            if(this.edit){
                this.newJob = Object.assign(this.getJob)
                this.selectedFiles = this.getJobFiles

                debugger
                if (this.checkForm() && this.newJob!==null) {
                    
                    //add attached files to the file state
                    if(this.selectedFiles[0].length>0){                    
                        this.$store.commit('ADD_FILES', this.selectedFiles[0])                
                    }
                    debugger
                    this.$store.commit('ADD_JOB',  this.newJob) 
                    
                    this.$router.push({ name: 'previewJob' });
                }
            } else{                

                
                if (this.checkForm() && this.newJob !== null) {
                    
                    const formData = this.getFormData(this.newJob)
                    //add attached files to the file state
                    if(this.selectedFiles[0].length>0){                
                        
                        for(let i = 0; i < this.selectedFiles[0].length; i++){
                            let file = this.selectedFiles[i]
                            debugger

                            formData.append('fileattachements[' + i + ']', file  )
                        }                      
                        
                        //this.$store.dispatch('ADD_FILES', this.selectedFiles[0])
                                 
                        
                       formData.append( 'userId', this.getUserId  )

                        
                        debugger
                        this.$store.dispatch('addPost', formData)
                    }else {
                        debugger

                        this.$store.commit('ADD_JOB',  this.newJob) 
                    
                        this.$router.push({ name: 'previewJob' })
                    }
                    
                    
                }          
            }
        }
    }
}
</script>