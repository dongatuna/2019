<template>
    <section>
        <div class="container mt-5 col-sm-10  col-lg-6 p-5">
                           
               <form class="form-signin" v-on:submit.prevent="forgot">
                    <div class="text-center mb-4">        
                    <h2 class="mb-3 font-weight-normal">Forgot password?</h2>        
                </div>

                <div class="form-label-group">
                    <input type="email" class="form-control" placeholder="Please enter your email" v-model="user.email" autofocus required>
                    <label for="inputUsername">Email</label>
                </div>               
                <br>

                <button class="btn btn-lg  btn-primary mb-3" type="submit">Submit</button>

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
            user: {
                email: ""
            }
        }
    },

    methods: {
        async forgot(){
            debugger
            await this.$store.dispatch('forgot', this.user)

            this.$router.push({path: '/checkemail'})
        }
    }
    
}
</script>

