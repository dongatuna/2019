<template>

    <section class="bg-light">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div>
                    <h4 class="text-dark display-4">Sign up form</h4>
                    <!--BEGINNING OF THE FORM-->
                    <form v-on:submit.prevent="selfSignUp">
                          <!--FIRST AND LAST NAMES-->
                        <div class="row">
                            <div class="col-md-6 col-sm-10">
                                
                                <div class="form-group">
                                    <label for="first">First Name:</label>
                                    <input type="text" class="form-control" name="first" v-model="student.first">
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-10">
                                <div class="form-group">
                                    <label for="last">Last Name:</label>
                                    <input type="text" class="form-control" name="last" v-model="student.last">
                                </div>
                            </div>
                        </div>

                         <!--MAILING ADDRESS-->
                        <div class="row">
                            <div class="col-md-12 col-sm-10">
                                <div class="form-group">
                                    <label for="address">Address:</label>
                                    <input type="text" class="form-control" name="address" v-model="student.address">
                                </div>
                            </div>                            
                        </div>

                         <!--CITY, STATE AND ZIP CODE-->
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="city">City:</label>
                                    <input type="text" class="form-control" name="city"  v-model="student.city">
                                </div>
                            </div>  
                              <div class="col-sm-2">
                                <div class="form-group">
                                    <label for="state">State:</label>
                                    <input type="text" class="form-control" name="state"  v-model="student.state">
                                </div>
                            </div>  
                              <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="zip">Zip:</label>
                                    <input type="text" class="form-control" name="zip" v-model="student.zip">
                                </div>
                            </div>                            
                        </div>
                                                
                          <!--EMAIL AND TELEPHONE-->
                        <div class="row">
                            <div class="col-md-6 col-sm-10">
                                <div class="form-group">
                                    <label for="email">EMAIL:</label>
                                    <input type="email" class="form-control" name="email" v-model="student.email">
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-10">
                                <div class="form-group">
                                    <label for="tel">Telephone</label>
                                    <input type="tel" class="form-control" name="tel" v-model="student.tel">
                                </div>
                            </div>
                        </div>
                         <!--COMMENTS AND QUESTIONS-->
                         <div class="row">
                            <div class="col-md-12 col-sm-10">
                                <div class="form-group">
                                    <label for="comments">Comments</label>
                                    <textarea class="form-control" name="comments" cols="30" rows="10" placeholder="Enter your comments or questions"  v-model="student.comments"></textarea>
                                </div>
                            </div>
                         </div>                       
                            <button class="btn btn-primary btn-block py-3" type="submit"><strong>Sign Up</strong> </button>
                         <div class="row">

                         </div>
                    </form>
                </div>                
            </div>
        </div>
    </section>    
</template>

<script>
export default {
    name:'SignUp',
    props: ['edit'],

    metaInfo: {
        title: 'Course Sign Up',
        titleTemplate: 'Sign Up for Caregiver and Nurse Assistant Courses Schedules'
        // meta: [
        //     {http-equiv: 'Content-Type', content: 'text/html; charset=utf-8'},
        //     {name: 'viewport'. content: 'width=device-width, initial-scale=1'},
        //     {name: 'description', content: 'Shows the registration form to sign up for caregiver and Nurse Assistant courses and trainings offered by Excel Health Careers Training.'}
        // ],

        // links: [
        //     {rel: 'canonical', href: 'https://www.goexcelcna.com/register/'}
        // ]
    },

    data(){
        return{
            student: {
                first: "",
                last: "",
                address: "",
                city: "",
                state: "",
                zip: "",
                comments: "",
                email: "",
                tel: ""
            }
        }
    },

    methods: {
        selfSignUp(){

            if(this.edit){
                //assign stored student in getStudent to student
                this.student = Object.assign(this.getStudent)
            }

            if(this.checkForm() && this.student!==null){
                this.$store.dispatch('adminCourseSignUp', this.student)
            }

           // this.$router.push({name: })
        }
    }
    
}
</script>