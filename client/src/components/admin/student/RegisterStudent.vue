<template>
    <section class="bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div>
                    <h4 class="text-dark display-4" v-if="edit" >Edit Student</h4>
                    <h4 class="text-dark display-4" v-else>Sign up form</h4>
                    <!--BEGINNING OF THE FORM-->
                    <form v-on:submit.prevent="addStudent" class="text-muted lead" ref="form" novalidate>
                            <!--FIRST AND LAST NAMES-->
                        <div class="row">
                            <div class="col-md-6 col-sm-10">
                                
                                <div class="form-group">
                                    <label for="first">First Name:</label>
                                    <input v-if="edit" type="text" class="form-control" name="first" v-model="getStudent.first">
                                    <input v-else type="text" class="form-control" name="first" v-model="student.first">
                                      <span class="text-danger" v-if="(this.errors.first)"><small>{{errors['first']}}</small></span>  
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-10">
                                <div class="form-group">
                                    <label for="last">Last Name:</label>
                                    <input v-if="edit" type="text" class="form-control" name="last" v-model="getStudent.last">
                                    <input v-else type="text" class="form-control" name="last" v-model="student.last">
                                    <span class="text-danger" v-if="(this.errors.last)"><small>{{errors['last']}}</small></span>  
                                </div>
                            </div>
                        </div>

                         <!--MAILING ADDRESS-->
                        <div class="row">
                            <div class="col-md-12 col-sm-10">
                                <div class="form-group">
                                    <label for="address">Address:</label>
                                    <input v-if="edit" type="text" class="form-control" name="address" v-model="getStudent.address">
                                    <input v-else type="text" class="form-control" name="address" v-model="student.address">
                                    <span class="text-danger" v-if="(this.errors.address)"><small>{{errors['address']}}</small></span>  
                                </div>
                            </div>                            
                        </div>

                         <!--CITY, STATE AND ZIP CODE-->
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="city">City:</label>
                                    <input v-if="edit" type="text" class="form-control" name="city"  v-model="getStudent.city">
                                    <input v-else type="text" class="form-control" name="city"  v-model="student.city">
                                    <span class="text-danger" v-if="(this.errors.city)"><small>{{errors['city']}}</small></span>  
                                </div>
                            </div>  
                              <div class="col-sm-2">
                                <div class="form-group">
                                    <label for="state">State:</label>
                                    <input v-if="edit" type="text" class="form-control" name="state"  v-model="getStudent.state">
                                    <input v-else type="text" class="form-control" name="state"  v-model="student.state">
                                    <span class="text-danger" v-if="(this.errors.state)"><small>{{errors['state']}}</small></span>  
                                </div>
                            </div>  
                              <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="zip">Zip:</label>
                                    <input v-if="edit" type="text" class="form-control" name="zip" v-model="getStudent.zip">
                                    <input v-else type="text" class="form-control" name="zip" v-model="student.zip">
                                    <span class="text-danger" v-if="(this.errors.zip)"><small>{{errors['zip']}}</small></span>  
                                </div>
                            </div>                            
                        </div>
                                                
                          <!--EMAIL AND TELEPHONE-->
                        <div class="row">
                            <div class="col-md-6 col-sm-10">
                                <div class="form-group">
                                    <label for="email">EMAIL:</label>
                                    <input v-if="edit" type="email" class="form-control" name="email" v-model="getStudent.email">
                                    <input v-else type="email" class="form-control" name="email" v-model="student.email">
                                    <span class="text-danger" v-if="(this.errors.email)"><small>{{errors['email']}}</small></span>  
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-10">
                                <div class="form-group">
                                    <label for="tel">Telephone</label>
                                    <input v-if="edit" type="tel" class="form-control" name="tel" v-model="getStudent.tel">
                                    <input v-else type="tel" class="form-control" name="tel" v-model="student.tel">
                                    <span class="text-danger" v-if="(this.errors.tel)"><small>{{errors['tel']}}</small></span>  
                                </div>
                            </div>
                        </div>

                           <!--PAYMENT AND DOB-->
                        <div class="row">
                            <div class="col-md-6 col-sm-10">
                                <div class="form-group">
                                    <label for="email">Date of Birth:</label>
                                    <input v-if="edit" type="date" class="form-control" name="birthdate" v-model="getStudent.birthdate">
                                    <input v-else type="date" class="form-control" name="birthdate" v-model="student.birthdate">
                                    <span class="text-danger" v-if="(this.errors.birthdate)"><small>{{errors['birthdate']}}</small></span>  
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-10">
                                <div class="form-group">
                                    <label for="payment">Payment</label>
                                    <div v-if="edit" >
                                        <input type="text" class="form-control" name="payment" v-model="getStudent.payments">
                                        <span class="text-dark" ><strong>Amount in account: </strong></span>
                                    </div>
                                    <div v-else >
                                        <input type="payment" class="form-control" name="payment" v-model="student.payments">
                                        <span class="text-danger" v-if="(this.errors.payment)"><small>{{errors['payment']}}</small></span> 
                                    </div>                                     
                                </div>
                            </div>
                        </div>
                         <!--COMMENTS AND QUESTIONS-->
                         <div class="row">
                            <div class="col-md-12 col-sm-10">
                                <div class="form-group">
                                    <label for="comments">Comments</label>
                                    <textarea v-if="edit" class="form-control" name="comments" cols="15" rows="5" placeholder="Enter your comments or questions"  v-model="getStudent.notes"></textarea>
                                    <textarea v-else class="form-control" name="comments" cols="30" rows="10" placeholder="Enter your comments or questions"  v-model="student.notes"></textarea>
                                </div>
                            </div>
                         </div>     
                            <button v-if="edit" class="btn btn-primary btn-block py-3" type="submit"><strong>Update Student</strong> </button>                  
                            <button v-else class="btn btn-primary btn-block py-3" type="submit"><strong>Sign Up</strong> </button>
                         <div class="row">

                         </div>    
                    </form>
                </div>
                
            </div>
        </div>
    </section>
    
</template>

<script>

import { mapGetters } from 'vuex'
import { store } from "../../../store/store"

export default {

    props:['edit'],

    computed: {
        ...mapGetters([
            "getStudent"
        ]),        
    },  

 
    data(){
        return{
            student_id: this.$route.params.student_id,
            course_id: this.$route.params.course_id,
            errors: [],
            student: {                
                first: '',
                last: null,
                address:null,
                city: null,
                state: "",
                zip: "",
                notes: "",
                email: "",
                birthdate: "",
                payments: "",
                tel: ""
            }
        }
    },

    methods: {

        checkForm(){
            this.errors = []

            if(this.student.first==''){
                this.errors['first'] = 'You must enter student\'s first name'
            }

            if(!this.student.last){
                this.errors['last'] = 'You must enter student\'s last name'
            }

            if(!this.student.address){
                this.errors['address'] = 'You must enter student\'s address'
            }

            if(!this.student.city){
                this.errors['city'] = 'You must enter student\'s city'
            }

            if(!this.student.state){
                this.errors['state'] = 'You must to enter student\'s state'
            }

            if(!this.student.zip){
                this.errors['zip'] = 'You must to enter student\'s zip'
            }

            if(!this.student.email){
                this.errors['email'] = 'You must to enter student\'s email'
            }

             if(!this.student.birthdate){
                this.errors['birthdate'] = 'You must to enter student\'s birthdate'
            }

            if(!this.student.tel){
                this.errors['tel'] = 'You need to enter student\'s tel'
            }

            if(this.errors.length === 0 
                && this.student.first 
                && this.student.last
                && this.student.address
                && this.student.zip
                && this.student.state
                && this.student.tel
                && this.student.email
                && this.student.birthdate

                ){
                return true
            }
        },

        addStudent(){

            if(this.edit){
                //assign stored student in getStudent to student
                this.student = Object.assign(this.getStudent)
                
                if(this.checkForm() && this.student!==null){
                    debugger
                    this.$store.dispatch('updateStudent', this.student)

                    debugger
                    this.$router.push({path: `/course/${this.student}`})
                }                
                
            }else{
                
                if(this.checkForm() && this.student!==null){
                    this.$store.dispatch('adminCourseSignUp', {student: this.student, course_id: this.course_id})

                    debugger
                    this.$router.push({path: '/admin'})
                }                
            }           
        }       
    }    
}
</script>