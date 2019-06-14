<template>
    <section>        
        <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
            <button class="btn btn-lg btn-success" v-on:click="addUser()" type="button">Click Here to Confirm Your Email.</button>
        </div>
    </section>
</template>
<script>
import { store } from "../../store/store"

export default {
    data(){
        return{            
            token: this.$route.params.token,            
        }
    },

    methods: {
        async addUser(){
           
            await this.$store.dispatch("addUser", this.token)

            this.$store.commit('REMOVE_MESSAGE')
            debugger
            this.$router.push({path: '/adminjobs'})
                   
        }
    }
    
}
</script>
