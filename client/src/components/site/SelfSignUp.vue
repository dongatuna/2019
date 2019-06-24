<template>
       <section class="bg-white">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-sm-8">                    
                    <h3 class="text-dark text-center">{{course}} sign up form</h3>
                    <br>
                    <!--BEGINNING OF THE FORM-->
                    <form v-on:submit.prevent="selfSignUp" class="text-muted lead mt-4"  ref="form" >
                            <!--FIRST AND LAST NAMES-->
                        <div class="row justify-content-center">
                            <div class="col-sm-4">                                
                                <div class="form-group">
                                    <label for="first">First Name</label>                                   
                                    <input  type="text" class="form-control" name="first" v-model="student.first" required>
                                     
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="last">Last Name</label>                                   
                                    <input type="text" class="form-control" name="last" v-model="student.last" required>                                    
                                </div>
                            </div>
                        </div>                               
                                                
                          <!--EMAIL AND TELEPHONE-->
                        <div class="row justify-content-center">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="email">Email</label>                                    
                                    <input type="email" class="form-control" name="email" v-model="student.email" required>                                      
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="tel">Telephone</label>                                 
                                    <input type="tel" class="form-control" name="tel" v-model="student.tel" required>                                    
                                </div>
                            </div>
                        </div>

                        
                         <!--COMMENTS AND QUESTIONS-->
                         <div class="row justify-content-center">
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="comments">Comments</label>
                                   
                                    <textarea class="form-control" name="comments" cols="15" rows="5" placeholder="Enter your comments or questions"  v-model="student.comments"></textarea>
                                </div>
                            </div>
                         </div>
                         <div class="row justify-content-center">
                            <div class="col-sm-8">     
                                           
                            <button class="btn btn-primary btn-block py-3" type="submit"><strong>Sign up</strong> </button>
                          </div>
                         </div>
                    </form>
                </div>                
            </div>
        </div>
    </section>
</template>

<script>
import { store } from "../../store/store"
import {mapGetters} from "vuex"
import moment from 'moment'

export default {

     data(){
        return{
            sel_course: {},
            course_id: this.$route.params.course_id,
            student: {
                first: "",
                last: "",
                comments: "",
                email: "",
                tel: ""
            }, 
            course: ""
        }
    },

    computed: {
         ...mapGetters([        
            "getAllCourses"
        ])
    },   

    mounted(){
         this.course_info(this.course_id)
    },

    methods: {
        selfSignUp(){

            if(this.student!==null){
                debugger
                this.$store.dispatch('selfCourseSignUp', {student: this.student, course_id:this.course_id})
            }

           this.$router.push({name: 'checkemail'})
        },

        course_info(id){ 

            this.getAllCourses.filter(course=>{
                if(course.course_id ===  id){
                    debugger
                    Object.assign(this.sel_course, course)

                    debugger
                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    const start_course_date = moment(this.sel_course.start_date).date()
                    const end_course_date = moment(this.sel_course.end_date).date()
                    const start_course_month = moment(this.sel_course.start_date).month()
                    const end_course_month = moment(this.sel_course.end_date).month()
                    const type = this.sel_course.type//
                    const name = this.sel_course.name
                    debugger
                    this.course  = `${months[start_course_month]} ${start_course_date} - ${months[end_course_month]} ${end_course_date} ${name} ${type.toLowerCase()}`

                    debugger
                    
                }
            }) 
        }

       
    }
    
}
</script>