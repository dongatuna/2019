<template>
    <section class="bg-light">
        <div class="container col-sm-10">
            <div class="row justify-content-center">
                <div >
                    <h4 class="text-dark display-4">Sign up form</h4>
                    <!--BEGINNING OF THE FORM-->
                    <form v-on:submit.prevent="selfSignUp">
                          <!--FIRST AND LAST NAMES-->
                        <div class="row">                           
                                
                            <div class="form-group">
                                <label for="first">First Name:</label>
                                <input type="text" class="form-control" name="first" v-model="student.first">
                            </div>
                        
                            <div class="form-group">
                                <label for="last">Last Name:</label>
                                <input type="text" class="form-control" name="last" v-model="student.last">
                            </div>
                            
                        </div>

                                                
                          <!--EMAIL AND TELEPHONE-->
                        <div class="row">
                            
                                <div class="form-group">
                                    <label for="email">EMAIL:</label>
                                    <input type="email" class="form-control" name="email" v-model="student.email">
                                </div>
                            
                            
                                <div class="form-group">
                                    <label for="tel">Telephone</label>
                                    <input type="tel" class="form-control" name="tel" v-model="student.tel">
                                </div>
                            
                        </div>
                         <!--COMMENTS AND QUESTIONS-->
                         <div class="row">
                            
                                <div class="form-group">
                                    <label for="comments">Comments</label>
                                    <textarea class="form-control" name="comments" cols="30" rows="10" placeholder="Enter your comments or questions"  v-model="student.comments"></textarea>
                                </div>
                           
                         </div>                       
                            <button class="btn btn-primary btn-block py-3" type="submit"><strong>Sign Up</strong> </button>
                         
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
            course_id: this.$route.params.course_id,
            student: {
                first: "",
                last: "",
                // address: "",
                // city: "",
                // state: "",
                // zip: "",
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