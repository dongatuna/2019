<template>
    <section>
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3  border-bottom shadow-sm">
            <h5 v-if="getRole==='admin'" class="my-0 mr-md-auto font-weight-normal"><router-link v-bind:to="{path: '/admin'}">Excel Health Careers Training</router-link></h5> 
            <h5 v-else-if="getRole==='user'" class="my-0 mr-md-auto font-weight-normal"><router-link v-bind:to="{path: '/adminjobs'}">Excel Health Careers Training</router-link></h5> 
            <h5 v-else class="my-0 mr-md-auto font-weight-normal"><router-link v-bind:to="{name: 'home'}">Excel Health Careers Training</router-link></h5>
            <nav class="my-2 my-md-0 mr-md-3">
                <router-link v-bind:to="{name: 'schedule'}"><a class="p-2 text-dark">Courses</a></router-link>      
                <router-link v-bind:to="{name: 'jobs'}"><a class="p-2 text-dark">Jobs</a></router-link>
                <!-- <router-link v-bind:to="{name: 'requirements'}"><a class="p-2 text-dark">Requirement</a></router-link> -->
                <router-link v-bind:to="{name: 'questions'}"><a class="p-2 text-dark">Questions</a></router-link>
                <router-link v-bind:to="{name: 'videos'}"><a class="p-2 text-dark">Videos</a></router-link>            
                <router-link v-if="!getUser" v-bind:to="{name: 'signin'}"><a> Sign in </a></router-link> 
                <router-link  v-if="!getUser" v-bind:to="{name: 'signup'}"><a>  Sign up </a></router-link>           
                <!-- <a v-if="getUser" class="nav-link text-light text-capitalize font-weight-bold px-3">Sign out</a>                                             -->
            </nav>  
        </div>
    </section>
    
</template>

<script>
import { store } from "../store/store"
import { mapGetters } from "vuex"
export default {
//  
    computed:{
        ...mapGetters([
            "getUser", "getRole"
        ])
    }
    
}
</script>
