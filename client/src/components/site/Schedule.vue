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
            <br><br>
            <div class="row justify-content-center">
                <div class="col-sm-6">
                    <hr>
                    <div class="alert alert-secondary" role="alert">
                        <p class="lead">Adult CPR/FA and BLS classes are not necessarily 6 hours long.</p>
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