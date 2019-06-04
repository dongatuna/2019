<template>
    <section>
        <table class="table" v-for="(registrant, index) of getDailyRegistrations" v-bind:key="registrant._id">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full names</th>                    
                    <th scope="col">Tel</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">{{ index+1 }}</th>
                    <td>{{ registrant.first }} {{ registrant.last }}</td>                    
                    <td>{{ registrant.tel }}</td>
                    <td>{{ registrant.email }}</td>
                    <td>  <button class="btn btn-outline-light btn-sm"
                                @click="editStudent(registrant._id)">Edit</button>
                          <button class="btn btn-outline-light btn-sm"
                                @click="transferStudent(registrant._id, registrant.payments[0].course_id)">Transfer</button>      
                          <button class="btn btn-outline-light btn-sm"
                                @click="unenrollStudent(registrant._id, registrant.payments[0].course_id)">Unenroll</button>        
                    </td>
                </tr>    
            </tbody>
        </table>
    </section>    
</template>

<script>

import AddCourse from './AddCourse.vue'
import { store } from '../../../store/store'
import { mapGetters } from 'vuex'

export default {

    computed:{
        ...mapGetters([
            "getDailyRegistrations"
        ])
    },

    created(){
        this.$store.dispatch('getCourse')
    },
    
    methods: {
        editStudent(registrant){
            this.$store.commit('ADD_STUDENT', regisrant)

            this.$router.push({name: 'editStudent'})
        },

        transferStudent(){

            this.$store.commit('ADD_STUDENT', regisrant)

            this.$router.push({name: 'editStudent'})

        },

        unenrollStudent(){
            this.$store.dispatch()
        }
    }
    
}
</script>