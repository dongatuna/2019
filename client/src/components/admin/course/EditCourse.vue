<template>
    <section class="bg-light text-dark mt-3">
        <!--COURSE START AND END DATES-->
        <div class="container-fluid">
            <div class="row justify-content-center">
                <p class="lead">
                   Below the class dates you want to update.  
                </p>
            </div>

            <form  v-on:submit.prevent="editCourse" class="text-muted lead">
                <div class="row justify-content-center"> 
                                              
                    <div class="col-sm-6">
                        
                        <div class="form-group">                        
                            <input type="text" class="form-control" v-model="displayDates" required>
                        </div>
                        
                    </div>                      
                                              
                </div>

                <div class="row justify-content-center">
                                
                    <button class="btn btn-primary py-3" type="submit" ><strong>Update Course</strong> </button>
                                
                </div>           
            </form>
                     
        </div>    
        
    </section>   
</template>

<script>

import { store } from "../../../store/store"
import { mapGetters } from "vuex"
import moment from 'moment'

export default {

    name: 'edit-course',

    computed:{
        ...mapGetters([
            "getCourse"
        ]),

         displayDates:{
            
            get(){
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                const course_start_date = moment(this.getCourse.start_date).date()
                const course_start_month = moment(this.getCourse.start_date).month()
                const course_end_date = moment(this.getCourse.end_date).date()
                const course_end_month = moment(this.getCourse.end_date).month()

                return `${months[course_start_month]} ${course_start_date} - ${months[course_end_month]} ${course_end_date}`
            },

            set(value){
                this.course_dates = value
            }            
        }       
    },

    data(){
        return{           
            course_dates: ""
        }
    },
    
    //https://jsfiddle.net/tunom37u/4/
    methods:{
        editCourse(){
            if(this.course_dates!=""){
                
                let payload = { course_id: this.$route.params.course_id, course_dates: this.course_dates }
                this.$store.dispatch('updateCourse', payload)     
                
                debugger
                this.$router.push({path:`/course/${this.$route.params.course_id}`})
            }
            
            
        }
         
    }
}
</script>
