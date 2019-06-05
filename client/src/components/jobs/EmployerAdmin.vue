<template>
    <section class="py-3 mt-3 bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="p-3 col-md-2">
                    <ul class="list-group">
                        <li class="list-group-item"><router-link v-bind:to="{ path: '/adminjobs' }">Home</router-link></li>
                        <li class="list-group-item"><router-link v-bind:to="{ path: '/postjob' }">Post Job Opening </router-link></li>
                        <li class="list-group-item"><router-link v-bind:to="{ path: '/caregiver_courses' }">Caregiver Courses </router-link></li>
                        <li class="list-group-item"><button class="btn btn-white btn-md" type="submit" v-on:click="logOut">Log out</button></li>
                    </ul>
                </div>

                <div class="p-3 col-md-6 col-sm-10">                    
                    
                    <router-view></router-view> 
                </div>
            </div>
        </div>        
    </section>    
</template>

<script>

import { store } from '../../store/store'
import { mapGetters } from 'vuex'

export default {

    computed:{
        ...mapGetters([            
            "getStudent"
        ])
    },

    data(){
        return{
            email: ''
        }
    },    

    // watch:{
    //     "$route":"dailyRegistrations"
    // },

    // created(){
    //      debugger
    //      this.dailyRegistrations()  
    // },
   
    methods: {

        logOut(){
            this.$store.dispatch('logOut')

            this.$router.push({name: 'home'})
        },

      
        // dailyRegistrations(){
        //     this.$store.dispatch('getDailyRegistrations')    
        // },

        searchStudent(){

            this.$store.dispatch('searchStudent', {email: this.email})
        
            this.$router.push({path: `/student_edit/${this.getStudent._id}`})
        }
    }    
}
</script>