<template>
    <section>
        <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
            <div class="row">                
               <form class="form-signin" v-on:submit.prevent="forgot">
                    <div class="text-center mb-4">        
                    <h2 class="h3 mb-3 font-weight-normal">Forgot password</h2>        
                </div>

                <div class="form-label-group">
                    <input type="email" class="form-control" placeholder="username" v-model="user.email" autofocus required>
                    <label for="inputUsername">Email</label>
                </div>

                </form>               
            </div>
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
        forgot(){
            
        }
    }
    
}
</script>

