<template>
    <section>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-sm-10" >
                    <p>
                        Thanks for posting on our site.  You can see the job posting you createted <router-link :to="{path: `/view/${getPost._id}`}">here</router-link>. 
                    </p>
                    {{getPost._id}}
                    <p>                              
                        Click <router-link v-bind:to="{path: '/adminjobs'}">here </router-link>to go back to your admin panel where you can:
                            <ol>
                                <li>create a new posting </li>
                                <li>edit a created posting </li>
                                <li>enroll an employee or a recruit for course (re) certification</li>
                            </ol>   
                    </p>
                </div>
            </div>
        </div>
    </section>    
</template>

<script>
import { store } from "../../store/store"
import {mapGetters} from "vuex"

export default {
    computed:{
        ...mapGetters([        
            "getPost"
        ])
    }, 
    
    // data(){
    //     return{
    //         postId: this.getPost.job._id
    //     }
    // }
}
</script>

<style scoped>
.post-payment-text {
    white-space: pre-wrap;
}
</style>





