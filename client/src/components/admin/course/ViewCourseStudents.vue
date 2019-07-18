<template>
    <div class="container">    
        <div class= "row justify-content-between mb-3">
            <div class="col-md-6">
                {{course_students}}
                <h5>{{displayDates(getCourse.start_date)}} - {{displayDates(getCourse.end_date)}} {{getCourse.name}} {{getCourse.type}} Class </h5>
            </div>
            <div class="col-md-3">
                <h5><router-link v-bind:to="{ path: `/edit_course/${getCourse._id}` }">Edit Class Dates</router-link></h5>
            </div>
            <div class="col-md-3">
                <button class="btn btn-primary btn-md" v-on:click="addStudent(getCourse._id)">+ Student </button> 
            </div>
        </div>

        <div class="row">
            <div v-if="getCourse.students.length>0">
                <table class="table" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Full names</th>                    
                            <th scope="col">Tel</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody v-for="(student, index) of getCourse.students" :key="index">
                        
                        <tr class="justify-content-between">
                            <th scope="row"> {{index+1}} </th>
                            <td>{{student.first}} {{student.last}}</td>                    
                            <td>{{student.tel}}</td>
                            <td>{{student.email}}</td>
                            <td> 
                                <button class="btn btn-light btn-sm" v-on:click="updateStudent(student._id)"
                                        >View/Update </button> 
                                <button class="btn btn-light btn-sm" v-on:click="transferStudent(student._id, getCourse._id)"
                                        >Transfer </button>      
                                <button class="btn btn-light btn-sm" v-on:click="unenrollStudent(student)"
                                        >Unenroll </button>        
                            </td>
                        </tr>    
                    </tbody>
                </table>
            </div>
            <div v-else>
                <table class="table" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Full names</th>                    
                            <th scope="col">Tel</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        <div class="d-flex justify-content-end mt-5">
                            <h4 class="text-danger lead" ><strong> No students signed up for this course. </strong>  </h4>
                        </div>
                    </tbody>
                </table>
            </div>
        </div> 
    </div>   
</template>

<script>

import { store } from "../../../store/store"
import {mapGetters} from "vuex"
import moment from "moment"

export default {
    computed:{
        ...mapGetters([
            "getCourse"
        ])
    },

    data(){
        return{
            moment: moment,
            //course: getCourse
            course_students: {}
        }
    },       

    // watch: {
    //     "$route": "viewCourseStudents"
    // },
    
    mounted(){
        debugger
        this.viewCourseStudents()        
    },

    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //         // access to component instance via `vm`
    //         this.course_students = vm.viewCourseStudents()
    //     })
    // },

    // updated(){
    //     this.viewCourseStudents()
    // },
    
    methods:{

        displayDates(dates){
            
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const course_date = this.moment(dates).date()
            const course_month = this.moment(dates).month()

            return `${months[course_month]} ${course_date}`
        },

        updateStudent(student_id){
            
            this.$store.dispatch('getStudent', student_id)

            debugger
            this.$router.push({path: `/student_edit/${student_id}`})

        },

        transferStudent(student_id, course_id){
            
            this.$store.commit('TO_TRANSFER', {student_id, course_id})
            debugger
            this.$router.push({path: '/transfer'})

        },

        unenrollStudent(prospective){
            debugger
            this.$store.dispatch('unenrollStudent', {course_id: this.getCourse._id, student_id: prospective._id} )
        },

        addStudent(course_id){
            debugger
            this.$router.push({path: `/student_register/${course_id}`})
        }, 

        viewCourseStudents(){
            
            this.$store.dispatch('getCourse', this.$route.params.course_id)
        }
    }
}
</script>
