<template>
    <section>
        <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
            <div class="alert alert-info" role="alert">
                <h4 class="text-dark">Looking to hire caregivers and CNAs?  Sign in below. <br> <small>To sign up for courses, click <a href="http://localhost:8080/schedule">here</a>.</small></h4>
            </div>
        
        <form class="form-signin" v-on:submit.prevent="signIn">
            <div class="text-center mb-4">        
            <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>        
        </div>

        <div class="form-label-group">
            <input type="email" class="form-control" placeholder="Email address" v-model.trim="user.email" autofocus required>
            <label for="inputEmail">Email</label>
        </div>

        <div class="form-label-group">
            <input type="password" class="form-control" placeholder="Password" name="password" id="password" v-model="user.password" required>
            <label for="inputPassword">Password</label>
        </div>    

        <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Sign in</button>

        </form>
        <p v-if="!getUser"><strong>Don't have an account? Sign up <router-link  v-bind:to="{name: 'signup'}"><a> here </a></router-link></strong></p>
        <p v-if="!getUser"><router-link  v-bind:to="{name: 'forgot'}"><a>Forgot password </a></router-link></p>
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
            user: {
                email: "",
                password: ""
            }
        }
    },

    methods: {
        async signIn(){
            this.$store.commit('REMOVE_USER')

            const email = this.user.email.toLowerCase()
            debugger
            await this.$store.dispatch("signIn", {email, password:this.user.password})
            debugger
            if(this.admin){
                this.$router.push({path: '/admin'})
            }
            
           
            if(this.getEmailCheck){
                debugger
                this.$router.push({path: '/checkemail'})
            }else{
                const message = this.getMessage
                alert(`${message}`)
                this.$router.push({path: '/signin'})
            } 
        
        }
    }
    
}
</script>
