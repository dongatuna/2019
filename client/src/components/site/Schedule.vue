<template>
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-10">
                    <div class="float-center mb-3">
                        <p class="text-dark lead">CNA/NAC Courses</p>
                    </div>
                   
                    <div class="row">
                    <div class="col-md-4">
                        <ul class="list-group">
                            <li class="list-group-item" v-for="course of getAllSortedCourses.Day" :key="course.courseId" >
                                <router-link v-bind:to="{ path: `/student_register/${course.courseId}` }">{{course.dates}}</router-link>
                            </li>
                        </ul>
                    </div>

                    <div class="col-md-4">
                        <ul class="list-group">
                            <li class="list-group-item" v-for="course of getAllSortedCourses.Evening" :key="course.courseId" >
                                <router-link v-bind:to="{ path: `/student_register/${course.courseId}` }">{{course.dates}}</router-link>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="col-md-4">
                        <ul class="list-group">
                            <li class="list-group-item" v-for="course of getAllSortedCourses.Weekends" :key="course.courseId" >
                                <router-link v-bind:to="{ path: `/student_register/${course.courseId}` }">{{course.dates}}</router-link>
                            </li>
                        </ul>
                    </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
    
</template>

<script>

import {mapGetters} from "vuex"
import {store} from '../../store/store'
export default {

    methods: {
        sortCoursesbyType(unsortedCourses){ 
            
            let sortedCourses = {
                days:[],
                evenings:[],
                weekends:[]
            };
            
            for( let index in unsortedCourses )
            {
                let type = unsortedCourses[index]['type']; 
                sortedCourses[type].push(unsortedCourses[index]);
            }            
            console.info(sortedCourses);
            return sortedCourses;
        },

    },

    computed: {
        ...mapGetters([
            "getAllCourses","getAllSortedCourses"
        ])
    },

    mounted(){
        this.$store.dispatch('getAllCourses')
        debugger
    },

}
</script>