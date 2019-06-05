<template>
    <section>
        <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
        <form class="form-signin" v-on:submit.prevent="signUp">
            <div class="text-center mb-4">        
            <h1 class="h3 mb-3 font-weight-normal">Sign up</h1>        
        </div>

        <div class="form-label-group">
            <input type="email" class="form-control" placeholder="username" v-model="user.email" autofocus required>
            <label for="inputUsername">Email</label>
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
      </div>
    </section>
</template>
<script>
import { store } from "../../store/store"

export default {
    data(){
        return{
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
                //const admin = { "username":this.user.username,  "password":this.user.password}
                await this.$store.dispatch("signUp", this.user)
                debugger
                this.$router.push({path: '/admin'})
            }   else {
                alert('Password and confirm password must match')
            }           
        }
    }
    
}
</script>
