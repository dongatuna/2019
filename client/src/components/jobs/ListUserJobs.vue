<template>
    <div class="container">    
        <div class= "justify-content-between m-3">
            <div class="row justify-content-between mb-4">
              
                <h5 class="lead"> Your Job Postings </h5>
                <button class="btn btn-primary" type="submit" v-on:click="createPost()"><strong>Post Your Job Opening</strong> </button>
              
            </div>

            <div v-if="getPosts.length > 0">
                <table class="table" >
                    <thead>
                        <tr class="justify-content-center">
                            <!-- <th scope="col">#</th> -->
                            <th scope="col">Title</th>                   
                            <th scope="col">Manage</th> 
                        </tr>
                    </thead>
                    <tbody v-for="(job, index) of getPosts" :key="index">                        
                        <tr class="justify-content-center">
                            <!-- <th scope="row"> {{index+1}} </th> -->
                            <td><router-link v-bind:to="{path: '/view/'+job._id}"> {{job.title}} </router-link></td>                    
                            
                            <td> 
                                <button class="btn btn-light btn-sm" v-on:click="rePost(job._id)"
                                        >Repost </button>  
                                <button class="btn btn-light btn-sm" v-on:click="editPost(job._id)"
                                        >Edit </button>                                     
                                <button class="btn btn-light btn-sm" v-on:click="deletePost(job._id)"
                                        >Delete </button>        
                            </td>
                        </tr>    
                    </tbody>
                </table>
            </div>
            <div v-else>
                <div class="card">
                    <h3 class="card-header">Find CNAs and caregivers</h3>
                    <div class="card-body">
                        <h5 class="card-title">Reach the right audience</h5>
                        <p class="card-text">Create a job posting for the right audience - this audience will share, know and apply for your job opening.  Our site is used by licensed HCAs, NARs and CNAs, CNA and caregiver students, recent graduates preparing for state exam, their friends and acquaintances.

                            <br> <br> On the other hand, if you have a prospective hire or an employee in need of (re)training, you are at the right place.  
                        </p>                       
                    </div>
                </div>
            </div>
         
        </div>           
    </div>    
</template>

<script>

import { store } from "../../store/store"
import {mapGetters} from "vuex"
import moment from "moment"

export default {

    data(){
        return{
            moment: moment
        }
    },

    computed:{
        ...mapGetters([
            "getCourse", "getUserId", "getPosts"
        ])
    },    

     watch: {
        "$route": "getJobListings"
    },

    mounted(){     
        //debugger  
        this.getJobListings()   
    },
    

    methods:{

        getJobListings(){
            this.$store.dispatch("getUserPosts", this.getUserId)     
        },

        createPost(){
            this.$router.push({ path: '/postjob' })
        },

        editPost(id){

            this.$store.dispatch("getPostById", id)

            this.$router.push({path: "/preview"})
        },

        rePost(id){

            alert('Reposting costs $25.00 -- just like creating a new post.')
            this.$store.dispatch("getPostById", id)

            this.$router.push({path: '/previewjob'})
        },

        async deletePost(id){

            this.$store.commit("CLEAR_POST")

            await this.$store.dispatch("deletePost", id)

            //this.$store.dispatch("getUserPosts", this.getUserId)   

            this.$router.push({path: '/adminjobs'})
            //this.$router.push({name: 'listJobs'})

        }
    }
}
</script>
