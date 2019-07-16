<template>
    <section class="py-5 mt-5 bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="p-3 col-md-2">
                    <ul class="list-group">
                        <li class="list-group-item"><router-link v-bind:to="{ name: 'daily-registrants' }">Home</router-link></li>
                        <li class="list-group-item"><router-link v-bind:to="{ name: 'add-course' }">Add Course </router-link></li>
                        <li class="list-group-item"><router-link v-bind:to="{ name: 'course-schedule' }">View Upcoming Courses </router-link></li>
                        <li class="list-group-item"><button class="btn btn-white btn-md" type="submit" v-on:click="logOut">Log out</button></li>
                    </ul>
                </div>

                <div class="p-3 col-md-6 col-sm-10">
                    
                    <form class="mb-3" v-on:submit.prevent="searchStudent">
                        <div class="input-group">
                        <input type="email" class="form-control form-control-lg" placeholder="Search student using email" v-model="email" required>   
                            <div class="input-group-append">
                                <button class="btn btn-outline-primary btn-md" type="submit" >Search</button>
                            </div>
                        </div> 
                    </form> 
                    <router-view></router-view> 
                </div>
            </div>
        </div>        
    </section>    
</template>

<script>

//import AddCourse from './course/AddCourse.vue'
//import ReadCourse from './course/ReadCourse.vue'
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
       
    methods: {

       async logOut(){
            this.$store.commit('RESET_STATE')
            this.$store.commit('REMOVE_USER')

            await this.$store.dispatch('logOut')

            debugger
            this.$router.push({name: 'home'})
        },

      
        // dailyRegistrations(){
        //     this.$store.dispatch('getDailyRegistrations')    
        // },

        searchStudent(){

            this.$store.dispatch('searchStudent', {email: this.email.trim()})
        
            this.$router.push({path: `/student_edit/${this.getStudent._id}`})
        }
    }    
}
</script>