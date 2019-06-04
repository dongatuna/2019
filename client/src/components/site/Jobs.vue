<template>
    <div class="container">    
        <div class= "row  justify-content-between mb-3">
            <div class="col-md-6">
                
                <h5 class="lead"> Job Postings </h5>
            </div>
         
        </div>

        <div class="row">
            <div v-if="getPosts.length>0">
                <table class="table" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>                        
                        </tr>
                    </thead>
                    <tbody v-for="(job, index) of getPosts" :key="index">
                        
                        <tr class="justify-content-between">
                            <th scope="row"> {{index+1}} </th>
                            <td><router-link v-bind:to="{path: '/jobs/'+job._id}"><strong>{{job.title}} </strong></router-link></td>                                  
                        </tr>    
                    </tbody>
                </table>
            </div>
            <div v-else>
                <div class="card">
                    <h3 class="card-header">Create a job posting and find CNAs and Caregivers</h3>
                    <div class="card-body">
                        <h5 class="card-title">Reach the right people</h5>
                        <p class="card-text">The right audience will know and apply to your job opening.  Our site is used by CNAs, CNA and caregiver students, recent graduates preparing for state exam, their friends and acquaintances.</p>
                        <router-link v-bind:to="{path: '/signup'}" class="btn btn-primary">Find Caregivers</router-link>
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
            "getPosts"
        ])
    },    

    
    // mounted(){
    //     debugger
    //     this.viewCourseStudents()
        
    // },

    methods:{
    }
}
</script>
