<template>
    <div class="container">    
        <div class= "justify-content-between mb-3">
            <div class="row">
                <div class="col-md-6">
                    <h5 class="lead"> Your Job Postings </h5>
                </div>
                <!-- <div class="col-md-3">
                    <button class="btn btn-primary btn-md" v-on:click="addPost(getCourse._id)">Find Caregivers </button> 
                </div> -->
            </div>

            <div v-if="getPosts.length>0">
                <table class="table" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>                   
                            <th scope="col">Manage</th> 
                        </tr>
                    </thead>
                    <tbody v-for="(job, index) of getPosts" :key="index">                        
                        <tr class="justify-content-between">
                            <th scope="row"> {{index+1}} </th>
                            <td><router-link v-bind:to="{path: '/jobs/'+job._id}"> {{job.title}} </router-link></td>                    
                            
                            <td> 
                                <button class="btn btn-light btn-sm" v-on:click="repostJob(getUser._id)"
                                        >Repost </button>  
                                <button class="btn btn-light btn-sm" v-on:click="editJob(job._id)"
                                        >View/Update </button>                                     
                                <button class="btn btn-light btn-sm" v-on:click="deleteJob(job._id)"
                                        >Delete </button>        
                            </td>
                        </tr>    
                    </tbody>
                </table>
            </div>
            <div v-else>
                <div class="card">
                    <h3 class="card-header">Create a job posting and find CNAs and Caregivers</h3>
                    <div class="card-body">
                        <h5 class="card-title">Reach the right people</h5>
                        <p class="card-text">The right audience will know and apply to your job opening.  Our site is used by CNAs, CNA and caregiver students, recent graduates preparing for state exam, their friends and acquaintances.

                            <br> <br> On the other hand, if you have a prospective hire or an employee in need of (re)-training, you are at the right place.  
                        </p>
                        <router-link v-bind:to="{path: '/postjob'}" class="btn btn-primary">Find Caregivers</router-link>
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
            "getCourse", "getUser", "getPosts"
        ])
    },    

    
    mounted(){
        debugger
        this.$store.dispatch()
        
    },

    methods:{
        editPost(id){
            this.$store.dispatch("getPosts", id)
        },

        rePost(user_id){

        },

        deletePost(id){

        }
    }
}
</script>
