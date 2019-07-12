<template>
    <div class="container-fluid"> 
        <div class="row justify-content-center">
            <div class="col-sm-10 col-md-6">
                <div class="card bg-light">
                    <h3 class="card-header bg-info text-white">Find CNAs and caregivers</h3>
                    <div class="card-body">
                        <h5 class="card-title">
                        For $ 25.00, 
                        </h5>
                        <p class="card-text"><strong>- Your post will be seen by exactly the audience you want to reach:</strong> </p>
                            <ol>
                                <li>people looking to work as HCA or NAC soon after completing their training</li>
                                <li>people preparing for HCA or NAC state license exam </li>
                                <li>people renewing their certificates such as CPR</li>
                                <li>people looking for their first CNA/HCA/NAR job or seeking supplemental income</li>
                            </ol>
                        <p class="card-text"><strong>- Your job is shareable through Facebook and Email </strong></p>
                        <p class="card-text"><strong>- Our current and former students receive email notification about job openings posted in our site</strong></p>
                        

                        <p class="card-text">Besides our past, current, and prospective students, who number in the thousands, our site is a resource and is used by caregivers and CNAs in the whole of WA.  Our site is used by those preparing for WA NAC/HCA state exams, recertifying their CPR/FAs, and searching for their first/additional works.</p>
                        <router-link v-if="getStatus" v-bind:to="{path: '/postjob'}" class="btn btn-primary float-right">Find Caregivers</router-link>
                        <router-link v-else v-bind:to="{path: '/signup'}" class="btn btn-primary float-right">Find Caregivers</router-link>
                    </div>
                </div>
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



