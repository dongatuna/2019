<template>
    <section>
        <div class="container-fluid">            
            <div class="mb-3">
                <p class="float-center text-dark lead">CNA/NAC Courses</p>
            </div>
            
            <div class="row ">
                
                <div class="col-md-4 col-sm-12">
                    <ul v-if="transfer" class="list-group list-group-flush">
                        <li class="list-group-item list-group-item-primary text-dark">Day Class <br> Mon - Fri <br> 3 weeks long <br> 9:00 a.m. - 3:00 p.m.</li>
                        <li class="list-group-item" v-for="course of getAllSortedCourses.Day" :key="course.courseId" >
                            {{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}<button class="btn btn-sm btn-outline-success"
                                                v-on:click="transfer_student(course.courseId)" type="button"> + </button>
                        </li>                                
                    </ul>
                    <ul v-else class="list-group list-group-flush justify-content-between">
                        <li class="list-group-item list-group-item-primary text-dark">Day Class <br> Mon - Fri <br> 3 weeks long <br> 9:00 a.m. - 3:00 p.m.</li>
                        <li  class="list-group-item" v-for="course of getAllSortedCourses.Day" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/course/${course.courseId}` }">{{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}</router-link>
                        </li>
                    </ul>
                </div>

                <div class="col-md-4 col-sm-12">
                        <ul v-if="transfer" class="list-group list-group-flush">
                        <li class="list-group-item list-group-item-primary text-dark">Evening Class <br> Mon - Fri<br> 3 weeks long <br> 3:00 p.m. - 9:00 p.m.</li>
                        <li class="list-group-item" v-for="course of getAllSortedCourses.Evening" :key="course.courseId" >
                            {{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}<button class="btn btn-sm btn-outline-success"
                                                v-on:click="transfer_student(course.courseId)" type="button"> + </button>
                        </li>                                
                    </ul>
                    <ul v-else class="list-group list-group-flush">
                        <li class="list-group-item list-group-item-primary text-dark">Evening Class <br> Mon - Fri<br> 3 weeks long <br> 3:00 p.m. - 9:00 p.m.</li>
                        <li  class="list-group-item" v-for="course of getAllSortedCourses.Evening" :key="course.courseId"  >
                            <router-link v-bind:to="{ path: `/course/${course.courseId}` }">{{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}</router-link>
                        </li>
                    </ul>
                </div>
                
                <div class="col-md-4 col-sm-12">
                        <ul v-if="transfer" class="list-group list-group-flush">
                        <li class="list-group-item list-group-item-primary text-dark">Weekend Class <br> Sat & Sun<br> 6 weekends long <br> 2:00 p.m. - 10:00 p.m.</li>
                        <li class="list-group-item" v-for="course of getAllSortedCourses.Weekends" :key="course.courseId" >
                            {{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}<button class="btn btn-sm btn-outline-success"
                                                v-on:click="transfer_student(course.courseId)" type="button" > + </button>
                        </li>                                
                    </ul>
                    <ul v-else class="list-group list-group-flush">
                        <li class="list-group-item list-group-item-primary text-dark">Weekend Class <br> Sat & Sun<br> 6 weekends long <br> 2:00 p.m. - 10:00 p.m.</li>
                        <li  class="list-group-item" v-for="course of getAllSortedCourses.Weekends" :key="course.courseId" >
                            <router-link v-bind:to="{ path: `/course/${course.courseId}` }">{{displayDates(course.start_date)}} - {{displayDates(course.end_date)}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>  

            <!--HCA - CNA BRIDGING--->   

            <!--BLS/CPR/FA COURSES-->               
        </div>           
    </section>    
</template>

<script>

import {mapGetters} from "vuex"
import {store} from '../../../store/store'
import moment from 'moment'


export default {

    props: ['transfer'],   

    // data(){
    //     return{
    //         moment: moment
    //     }
    // },
    computed: {
        ...mapGetters([
            "getCourseIds", "getTransfer", "getAllCourses","getAllSortedCourses"
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