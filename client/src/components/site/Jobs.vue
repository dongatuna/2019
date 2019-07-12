<template>
    <div class="container-fluid">    
        <!-- <div class= "row justify-content-center mb-3">
            <div class="col-md-10">                
                <h5 class="lead"> Job Postings </h5>
            </div>         
        </div> -->

        <div class="row justify-content-center">
            <div class="col-sm-10 col-md-6">
                <div v-if="getAllPosts.length>0">
                <table class="table" >
                    <thead>
                        <tr>                           
                            <!-- <th scope="col">Title</th>   -->
                            <th scope="col"><h5 class="lead"> Job Postings </h5> </th>                     
                        </tr>
                    </thead>
                    <tbody v-for="(job, index) of getAllPosts" :key="index">
                        
                        <tr>                            
                            <td><router-link v-bind:to="{path: '/view/'+job._id}"><strong>{{job.title}} </strong></router-link></td>                                  
                        </tr>    
                    </tbody>
                </table>
                </div>
                <div class="mt-5" v-else>
                   <h5>Our website is just a baby :'(...and so no jobs have been posted yet.  Check back in a few...</h5>
                   <!-- <br> -->
                   <p class="lead">In the meantime, you can review some theory questions, watch skill videos, or sign up for a course.</p>
                </div>

            </div>
            
           
        </div> 
    </div>   
</template>

<script>

import { store } from "../../store/store"
import {mapGetters} from "vuex"
import moment from "moment"


//  Besides our past, current, and prospective students, who number in the thousands, our site is a resource and is used by caregivers and CNAs in the whole of WA.  Our site is used by those
//  * preparing for WA NAC/HCA state exams, recertifying their CPR/FAs, and searching for their first/additional works.
//  * 
//  * FOR $ 25: 
//  *  - Your post will be seen by exactly the audience you want to reach:
//  *      * people with intention to work as HCA or NAC soon
//  *      * people preparing for HCA or NAC state license exam
//  *      * people renewing their certificates such as CPR
//  *  - Your job is shareable through Facebook and Email
//  *  - Our current and former students receive email notification about job openings posted in our site

export default {   

    data(){
        return{
            moment: moment
        }
    },

    computed:{
        ...mapGetters([
            "getAllPosts"
        ])
    },    

    mounted(){     
        debugger  
        this.$store.dispatch("getAllPosts")        
    },
    // mounted(){
    //     debugger
    //     this.viewCourseStudents()
        
    // },

    methods:{
    }
}
</script>
