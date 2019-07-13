<template>    
    <div class=" px-3">
        <div class="card bg-light">
            <h3 class="card-header bg-info text-white">Tips for posting</h3>
            <div class="card-body">
                
                <ul class="card-text">
                    <li>Clearly specify whom to contact re: job opening</li>
                    <li>If applicable, include website address to your application or where your application can be downloaded</li>
                    <li>If applicable, state how long your job orientation is</li>
                    <li>Put your requirements in a list (stylistic suggestion)</li>
                    <li>State whether you offer tuition reimbursement and/or whether you assist candidates acquire necessary training</li>
                </ul>      


                <p class="card-text"><strong>You are welcome to come and make a presentation in person to our students.  Call/text Don @ 2062711946.  Thanks (asante) for using our service and we hope to see you back!                    
                    </strong>
                </p>                    


                <router-link v-if="getStatus" v-bind:to="{path: '/postjob'}" class="btn btn-primary float-right">Find Caregivers</router-link>
                <router-link v-else v-bind:to="{path: '/signup'}" class="btn btn-primary float-right">Find Caregivers</router-link>
            </div>
        </div>
    </div>      
</template>

<script>

import { mapGetters } from 'vuex'
import { store } from "../../store/store"

export default {

    computed:{
        ...mapGetters([
            "getStatus"
        ])
    }
    
}
</script>


<style scoped>
    .card-text {
    white-space: pre-wrap;
}

</style>



