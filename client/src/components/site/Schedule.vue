<template>
    <section>
        <div class="container-fluid">    
            <div class="row justify-content-center mb-3">
                <div class="col-sm-12 col-md-4">
                    <h3 class="diplay">Select the course to view schedule</h3>
                    <hr><br>
                     <select v-model="choices"  class="form-control form-control-lg">
                        <option v-for="(choice, index) of choices" :key="index">{{choice}}</option>                               
                    </select>
                </div>
                
            </div>
            <br>
            <div class="row justify-content-center">     
           
            <!-- <div class="row "> -->
                
                <div class="col-md-2 col-sm-12">
                                 
                    <ul class="list-group list-group-flush justify-content-between">
                        <li class="list-group-item list-group-item-primary text-dark">Day Class <br> Mon - Fri <br> 3 weeks long <br> 9:00 a.m. - 3:00 p.m.</li>
                        <li  class="list-group-item" v-for="course of getAllSortedCourses.Day" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/register/${course.courseId}` }">{{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}</router-link>
                        </li>
                    </ul>
                </div>

                <div class="col-md-2 col-sm-12">
                                      
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item list-group-item-primary text-dark">Evening Class <br> Mon - Fri<br> 3 weeks long <br> 3:00 p.m. - 9:00 p.m.</li>
                        <li  class="list-group-item" v-for="course of getAllSortedCourses.Evening" :key="course.courseId"  >
                            <router-link v-bind:to="{ path: `/register/${course.courseId}` }">{{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}</router-link>
                        </li>
                    </ul>
                </div>
                
                <div class="col-md-2 col-sm-12">
                                     
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item list-group-item-primary text-dark">Weekend Class <br> Sat & Sun<br> 6 weekends long <br> 2:00 p.m. - 10:00 p.m.</li>
                        <li  class="list-group-item" v-for="course of getAllSortedCourses.Weekends" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/register/${course.courseId}` }">{{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}</router-link>
                        </li>
                    </ul>
                </div>
            <!-- </div>  -->
           
            </div>              
        </div>           
    </section>    
</template>

<script>

import {mapGetters} from "vuex"
import {store} from '../../store/store'
import moment from 'moment'


export default {

    props: ['transfer'],   

    data(){
        return{
            choices: ["CNA", "Adult CPR/FA", "Infant, Child, Adult CPR/FA", "Basic Life Support (BLS)"],
        }
    },
    computed: {
        ...mapGetters([
            "getCourseIds", "getAllCourses","getAllSortedCourses"
        ])        
    },

    methods: {
        displayDates(dates){
            
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const course_date = moment(dates).date()
            const course_month = moment(dates).month()

            return `${months[course_month]} ${course_date}`
        },

        transfer_student(course_id){
            this.$store.dispatch('transferStudent', {old_course_id: this.getTransfer.course_id, new_course_id: course_id, student_id: this.getTransfer.student_id})

            this.$router.push({path: `/course/${course_id}`})
        },

    },    

    mounted(){
        this.$store.dispatch('getAllCourses')
        debugger
    },

}
</script>