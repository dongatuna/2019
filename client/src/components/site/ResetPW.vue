<template>
    <section>
        <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
        <form class="form-signin" v-on:submit.prevent="reset">
            <div class="text-center mb-4">        
            <h1 class="h3 mb-3 font-weight-normal">Reset Password</h1>        
        </div>

        <div class="form-label-group">
            <input type="password" class="form-control" placeholder="Password" name="password" id="password" v-model="credentials.password" required>
            <label for="inputPassword">Password</label>
        </div>   

        <div class="form-label-group">
            <input type="password" class="form-control" placeholder="Confirm password" name="password2" id="password2" v-model="credentials.password2" required>
            <label for="inputPassword">Confirm Password</label>
        </div>     

        <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">Submit</button>

        </form>

        <br>   

        <p class="text-info">Check your email for further instructions on how to reset your credentials.</p>    
      </div>
    </section>
</template>
<script>
import { store } from "../../store/store"

export default {
    data(){
        return{
            
            token: this.$route.params.token,
            credentials: {
                password: "",
                password2: ""
            }
        }
    },

    methods: {
        async reset(){

            if( this.credentials.password === this.credentials.password2 ){
                
                await this.$store.dispatch("reset", {credentials : this.credentials, token : this.token})

                debugger                      
                this.$router.push({path: '/adminjobs'})
            }   else {
                alert('Password and confirm password must match')
            }           
        }
    }
    
}
</script>
