<template>
    <section>
        <div class="container-fluid">    
            <div class="row justify-content-center mb-5">
                <div class="col-sm-12 col-md-4 ">
                    <h3 class="diplay text-center">Select the course to view schedule</h3>
                    <hr>
                     <select v-model="selected" :on="sortCourses" class="form-control form-control-md bg-danger text-white" selected>
                        <option v-for="(choice, index) of choices" :key="index"><strong>{{choice}}</strong></option>                               
                    </select>
                </div>
                
            </div>
            <br>
            <div class="row justify-content-center mb-3">            
               
                <div class="col-md-2 col-sm-12">
                                 
                    <ul v-if="selected ==='CNA'" class="list-group list-group-flush justify-content-between">
                        <li class="list-group-item list-group-item-primary text-dark">Day Class <br> Mon - Fri <br> 3 weeks long <br> 9:00 a.m. - 3:00 p.m.</li>                        
                        <li  class="list-group-item" v-for="course of dayCourses" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/register/${course.courseId}` }">{{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}</router-link>
                        </li>
                    </ul>
                    <ul v-else class="list-group list-group-flush justify-content-center">
                        <li class="list-group-item list-group-item-primary text-dark">Day Class <br> 9:00 a.m. - 3:00 p.m.</li>                        
                        <li  class="list-group-item text-center" v-for="course of dayCourses" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/register/${course.courseId}` }">{{displayDates(course.start_date)}}</router-link>
                        </li>
                    </ul>
                </div>

                <div class="col-md-2 col-sm-12">
                                      
                    <ul v-if="selected ==='CNA'" class="list-group list-group-flush justify-content-between">
                        <li class="list-group-item list-group-item-primary text-dark">Evening Class <br> Mon - Fri <br> 3 weeks long <br> 3:00 p.m. - 9:00 p.m.</li>                        
                        <li  class="list-group-item" v-for="course of eveningCourses" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/register/${course.courseId}` }">{{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}</router-link>
                        </li>
                    </ul>
                    <ul v-else class="list-group list-group-flush justify-content-center">
                        <li class="list-group-item list-group-item-primary text-dark">Evening Class <br> 3:00 p.m. - 9:00 p.m.</li>                        
                        <li  class="list-group-item text-center" v-for="course of eveningCourses" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/register/${course.courseId}` }">{{displayDates(course.start_date)}}</router-link>
                        </li>
                    </ul>
                </div> 
                
                <div class="col-md-2 col-sm-12">
                                     
                    <ul v-if="selected ==='CNA'" class="list-group list-group-flush justify-content-between">
                        <li class="list-group-item list-group-item-primary text-dark">Weekend Class <br> Sat & Sun <br> 6 weekends long <br> 2:00 p.m. - 10:00 p.m.</li>                        
                        <li  class="list-group-item" v-for="course of weekendCourses" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/register/${course.courseId}` }">{{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}</router-link>
                        </li>
                    </ul>
                    <ul v-else class="list-group list-group-flush justify-content-center">
                        <li class="list-group-item list-group-item-primary text-dark">Weekend Class <br> 10:00 a.m. - 4:00 p.m.</li>                        
                        <li class="list-group-item text-center" v-for="course of weekendCourses" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/register/${course.courseId}` }">{{displayDates(course.start_date)}}</router-link>
                        </li>
                    </ul>
                </div>            
            </div>    
            
            <div class="row justify-content-center">
                <div class="col-sm-12 col-md-6">
                    <hr>
                    <div class="alert alert-info" role="alert">
                        <div v-if="selected !=='CNA'" >

                            <p class="lead text-dark">Please note:</p>
                            <ul class="lead text-dark">                                
                                <li>Adult CPR/FA AED and BLS courses are not necessarily 6 hours long</li>
                                <li>Infant, Child and Adult CPR/FA courses are likely to extend past 6 hours</li>
                                <li>Skill testing is 30 minutes long.  Make arrangement by calling 206 271 1946</li>
                            </ul>
                        </div>

                        <div v-else>
                            <p class="lead text-dark">CNA course requirements include:</p>
                            <ul class="lead text-dark">
                                <li>TB Test Results less than 1 year old</li>
                                <li>Valid ID</li>                                
                                <li>$ 600.00 tuition cost</li>
                                <li>Pass math and English entrance exam or unofficial college transcript showing at least 30 credits </li>
                                <li>Functioning email address</li>
                            </ul>
                            <hr>
                            <p class="lead text-dark">CNA course includes:</p>
                            <ul class="lead text-dark">
                                <li>HIVAIDS Course</li>
                                <li>AHA Adult CPRFA/AED</li>                      
                                
                            </ul>
                            
                        </div>

                        <p class="lead">Keep your receipts carefully.  Some or all of the trainings costs are reimbursable.  Inquire around because some employers help with training costs upfront.</p>

                        
                    </div>
                </div>

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
            selected: "CNA",
            choices: ["CNA", "Adult CPR/FA", "Infant, Child, Adult CPR/FA", "Basic Life Support (BLS)"],
            dayCourses: [],
            eveningCourses: [],
            weekendCourses: []
        }
    },
    
    computed: {
        ...mapGetters([
            "getCourseIds", "getAllCourses","getAllSortedCourses"
        ]),
        
        sortCourses(){
            this.dayCourses = this.getAllSortedCourses.Day.filter(course => course.name === this.selected)
            this.eveningCourses  = this.getAllSortedCourses.Evening.filter(course => course.name === this.selected)
            this.weekendCourses  = this.getAllSortedCourses.Weekends.filter(course => course.name === this.selected)
           // console.log("Here is the courses ", course)
        }
    },

    methods: {
        displayDates(dates){
            
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const course_date = moment(dates).date()
            const course_month = moment(dates).month()

            return `${months[course_month]} ${course_date}`
        }
    },    

    mounted(){
        //this.$store.commit('REMOVE_COURSES')
        this.$store.dispatch('getAllCourses')
        debugger
    },

}
</script>

<style scoped>
.course-info  {
    white-space: pre-wrap;
}
</style>

