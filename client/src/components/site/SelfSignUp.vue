<template>
       <section class="bg-white">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-sm-6">                    
                    <h3 class="text-dark text-center">{{course}} class sign up form</h3>
                    <br>
                    <!--BEGINNING OF THE FORM-->
                    <form ref="form" >
                            <!--FIRST AND LAST NAMES-->
                        <div class="row justify-content-center">
                            <div class="col-sm-4">                                
                                <div class="form-group">
                                    <label for="first">First Name</label>                                   
                                    <input  type="text" class="form-control" name="first" v-model="student.first">
                                     
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="last">Last Name</label>                                   
                                    <input type="text" class="form-control" name="last" v-model="student.last">                                    
                                </div>
                            </div>
                        </div>                               
                                               
                          <!--EMAIL AND TELEPHONE-->
                        <div class="row justify-content-center">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="email">Email</label>                                    
                                    <input type="email" class="form-control" name="email" v-model="student.email">                                      
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="tel">Telephone</label>                                 
                                    <input type="tel" class="form-control" name="tel" v-model="student.tel">                                    
                                </div>
                            </div>
                        </div>
                       
                        
                         <!--COMMENTS AND QUESTIONS-->
                        <div class="row justify-content-center">
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="comments">Comments</label>
                                    
                                    <textarea class="form-control" name="comments" cols="10" rows="2" placeholder="Enter your comments or questions"  v-model="student.comments"></textarea>
                                </div>          
                            </div>
                        </div>                    
 
                        <div class="row justify-content-center">
                            <div class="col-sm-8 p-3 bg-light">     
                                <p class="text-center lead text-danger"><strong> Classes fill up fast.  Register now and secure your spot immediately. </strong></p>
                                
                                <div ref="card" class="credit-card-inputs mb-2"  ></div>               
                                <button class="btn btn-primary btn-block py-3" type="submit" v-on:click="register"><strong>Pay $ {{registration}}.00 to register</strong> </button> 
                            </div>
                        </div>

                       {{getAllCourses}}

                        <div class="row justify-content-center">
                            <div class="col-sm-8 bg-white">     
                                <!-- <p class="text-center text-center"> Add me to the waitlist. </p> -->
                                <br>                                             
                                <button class="btn btn-secondary py-3" type="submit"><strong>Add me to the waitlist. </strong> </button> 
                            </div>
                        </div>


                    </form>
                </div>                
            </div>
        </div>
    </section>
</template>

<script>


import Keys from '../../helpers/courses'
    // let stripe = Stripe(`${Keys.stripeKeys.publishable_key}`),
    //     elements = stripe.elements(),
    //     card = undefined
 

    // var style = {
    //     base: {
    //         color: '#32325d',
    //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //         fontSmoothing: 'antialiased',
    //         fontSize: '16px',
    //         '::placeholder': {
    //         color: '#aab7c4'
    //         }
    //     },
        
    //     invalid: {
    //         color: '#fa755a',
    //         iconColor: '#fa755a'
    //     }
    // }
import { store } from "../../store/store"
import {mapGetters} from "vuex"
import moment from 'moment'

export default {

    data(){
        return{
            errors: [],
            sel_course: {},
            //course_id: this.$route.params.course_id,
            student: {
                first: "",
                last: "",
                comments: "",
                email: "",
                tel: ""
            }, 
            course: "",
            registration: ''
        }
    },

    computed: {
         ...mapGetters([        
            "getAllCourses"
        ])  
        
    },       

    created(){                   

        this.getAllCourses.filter(course => {
            if(course.courseId === this.$route.params.course_id){
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                const start_course_date = moment(course.start_date).date()
                const end_course_date = moment(course.end_date).date()
                const start_course_month = moment(course.start_date).month()
                const end_course_month = moment(course.end_date).month()
                const type = course.type
                const name = course.name        
                
                if(course.end_date){
                    this.registration = Keys.Costs[course.name]
                    this.course = `${months[start_course_month]} ${start_course_date} - ${months[end_course_month]} ${end_course_date} ${name} ${type.toLowerCase()}`  
                    
                }else{
                    this.course = `${months[start_course_month]} ${start_course_date} ${name} ${type.toLowerCase()}` 
                
                    this.registration = Keys.Costs[course.name]
                }
            }       
        })
        
        // card = elements.create('card')
        // card.mount(this.$refs.card)  
       
    },

    // mounted(){
    //     let stripe = Stripe(`${Keys.stripeKeys.publishable_key}`),
    //         elements = stripe.elements(),
    //         card = elements.create('card', style)
    //     card.mount(this.$refs.card)
    // },
    
    methods: {

        async register(){
            //try{

                // alert('what is stripe ', stripe)  
                // debugger
                // const {token, error} = await stripe.createToken(card)                       
            
                // let self = this

                // if (error) {
                //     self.hasCardErrors = true
                //     self.$forceUpdate() // Forcing the DOM to update so the Stripe Element can update.
                //     return
                // }

                // debugger
                // alert('This is the token ', token)
         
            
        },

         checkForm() {
   
            this.errors = []

            if (!this.student.first) {
                this.errors['first'] = "Please enter your first name."
            }

            if (!this.student.last) {
                this.errors['last'] = "Please enter your last name."
            }

            if (!this.student.email) {
                this.errors['email'] = "Please enter your email address."
            }         

            if (!this.student.tel) {
                this.errors['tel'] = "Please enter your phone number."
            }                    

            if (this.errors.length == 0 &&
                this.student.last &&
                this.student.first &&
                this.student.tel &&
                this.student.email 
            ){
                return true
            }
        },
        selfSignUp () {

            if(this.checkForm()){
                debugger
                this.$store.dispatch('selfCourseSignUp', {student: this.student, course_id: this.course_id})
            }

            this.$router.push({name: 'checkemail'})
        }

       
    }
    
}
</script>

<style>

    .credit-card-inputs{
        box-sizing: border-box;
        border: 2px solid green;
        height: 40px;

        padding: 10px 12px;

    /* border: 1px solid transparent; */
        border-radius: 4px;
        background-color: white;

        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
    }

    .credit-card-inputs--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .credit-card-inputs--invalid {
        border-color: #fa755a;
    }

    .credit-card-inputs--webkit-autofill {
        background-color: #fefde5 !important;
    }

</style>