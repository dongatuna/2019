<template>
    <div v-if="getDailyRegistrations.length>0">
        <table class="table" >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full names</th>                    
                    <th scope="col">Tel</th>
                    <th scope="col">Email</th>
                    <th scope="col">Course Dates</th>
                    
                </tr>
            </thead>
            <tbody v-for="(student, index) of getDailyRegistrations" :key="index">
                
                <tr class="justify-content-between">
                    <th scope="row"> {{index+1}} </th>
                    <td>{{student.first}} {{student.last}} </td>                    
                    <td>{{student.tel}}</td>
                    <td>{{student.email}}</td>
                    <td><router-link v-bind:to="{path: `/course/${student.payments[0].course_id._id}`}">{{displayDates(student.payments[0].course_id.start_date)}} - {{displayDates(student.payments[0].course_id.end_date)}}</router-link></td>
                </tr>    
            </tbody>
        </table>
    </div>
    <div v-else>
        <table class="table" >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full names</th>                    
                    <th scope="col">Tel</th>
                    <th scope="col">Email</th>
                    <th scope="col">Course Dates</th>
                </tr>
            </thead>
            <tbody >
                <div class="d-flex justify-content-end mt-5">
                    <h4 class="text-danger lead" ><strong> No students registered today. </strong>  </h4>
                </div>
            </tbody>
        </table>
    </div>    
</template>

<script>
import { store } from "../../../store/store"
import {mapGetters} from "vuex"
import moment from 'moment'

export default {
    computed:{
        ...mapGetters([
            "getDailyRegistrations"
        ])
    },    

     data(){
        return{
            moment: moment
        }
    },

    mounted(){
        debugger
        this.dailyRegistrations()
        
    },
    
    methods:{
        dailyRegistrations(){
             this.$store.dispatch('getDailyRegistrations')    
        },
        displayDates(dates){
            
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            const course_date = this.moment(dates).date()
            const course_month = this.moment(dates).month()

            return `${months[course_month]} ${course_date}`
        }

    }
}
</script>
