<template>
    <section>
        <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
            <div v-if="message">
                <div class="alert alert-danger" role="alert">
                {{message}}
                </div>
            </div>

            <div class="alert alert-info" role="alert">
                <h4 class="text-dark">Looking to hire caregivers and CNAs?  Sign up below. <br> <small>To sign up for courses, click <a href="http://localhost:8080/schedule">here</a>.</small></h4>
            </div>
            
            <form class="form-signin" v-on:submit.prevent="signUp">
            <div class="text-center mb-4">        
                <h1 class="h3 mb-3 font-weight-normal">Sign up</h1>        
            </div>            

            <div class="form-label-group">
                <input type="text" class="form-control" placeholder="Email address" v-model="user.email" autofocus required>
                <label for="inputEmail">Email</label>
            </div>

            <div class="form-label-group">
                <input type="password" class="form-control" placeholder="Password" name="password" id="password" v-model="user.password" required>
                <label for="inputPassword">Password</label>
            </div>   

            <div class="form-label-group">
                <input type="password" class="form-control" placeholder="Confirm password" name="password2" id="password2" v-model="user.password2" required>
                <label for="inputPassword">Confirm Password</label>
            </div>     

            <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Sign up</button>

            </form>
        <p>Have an account? Sign in  <router-link v-if="!getUser" v-bind:to="{name: 'signin'}"><a> here </a></router-link></p>
      </div>
    </section>
</template>
<script>
import { store } from "../../store/store"
import { mapGetters } from "vuex"
export default {

    props:['admin'],

    computed:{
        ...mapGetters([
            "getUser", "getMessage", "getEmailCheck"
        ])
    },

    data(){
        return{
            message: this.getMessage,
            user: {
                email: "",
                password: "",
                password2: ""
            }
        }
    },

    methods: {
         async signUp(){

            if(this.user.password===this.user.password2){
                
                const response = await this.$store.dispatch("signUp", this.user)
                debugger
                if(this.admin){
                    this.$router.push({path: '/admin'})
                    
                }
                
                if(this.getEmailCheck){
                    this.$router.push({path: '/checkemail'})
                }else{
                    const message = this.getMessage
                    alert(`${message}`)
                    this.$router.push({path: '/signup'})
                }
                
               
                
            }   else {
                this.message = 'Password and confirm password must match'
            }           
        }
    }
    
}
</script>
