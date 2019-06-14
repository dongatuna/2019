<template>
    <section>        
        <div class="container mt-5 col-sm-10 col-md-6 col-lg-4 p-5">
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Almost done signing up!</h4>
                <p>{{ getMessage }}</p>
                <hr>
                <p class="mb-0">Thanks.</p>
            </div>
        </div>
    </section>
</template>
<script>

import { store } from "../../store/store"
import { mapGetters } from "vuex"

export default {
    computed:{
        ...mapGetters([
            "getMessage"
        ])
    },

    data(){
        return{            
            message: this.getMessage,            
        }
    },

  
    
}
</script>
