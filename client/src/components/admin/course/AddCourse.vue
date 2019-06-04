<template>
    <section class="bg-light text-dark mt-3">
        <!--COURSE START AND END DATES-->
        <div class="container-fluid">

            <form action="">
                <div class="row justify-content-center"> 
                                              
                <div class="col-md">
                    <p class='display-text'>Day Classes</p>
                    <div class="form-group">
                        
                        <input type="text" class="form-control" name="row11" v-model="courses.options[0].dates[0]">
                    </div>
                    <div class="form-group">
                        
                        <input type="text" class="form-control" name="row21" v-model="courses.options[0].dates[1]">
                    </div>
                     <div class="form-group">
                        
                        <input type="text" class="form-control" name="row31" v-model="courses.options[0].dates[2]">
                    </div>
                </div>            
                
                <div class="col-md">
                    <p class='display-text'>Evening Classes</p>
                    <div class="form-group">
                        
                        <input type="text" class="form-control" name="row12" v-model="courses.options[1].dates[0]">
                    </div>
                    <div class="form-group">
                        
                        <input type="text" class="form-control" name="row22" v-model="courses.options[1].dates[1]">
                    </div>
                    <div class="form-group">
                       
                        <input type="text" class="form-control" name="row32" v-model="courses.options[1].dates[2]">
                    </div>
                </div>

                 <div class="col-md">
                     <p class='display-text'>Weekend Classes</p>
                    <div class="form-group">
                       
                        <input type="text" class="form-control" name="row13" v-model="courses.options[2].dates[0]">
                    </div>
                    <div class="form-group">
                        
                        <input type="text" class="form-control" name="row23" v-model="courses.options[2].dates[1]">
                    </div>
                    <div class="form-group">
                       
                        <input type="text" class="form-control" name="row33" v-model="courses.options[2].dates[2]">
                    </div>
                </div>          
                                              
            </div>

            <div class="row justify-content-center">
                <div class="col-md-9">                    
                    <button class="btn btn-primary btn-block py-3" type="submit" v-on:click="addCourses"><strong>Add Courses</strong> </button>
                </div>                
            </div>           
            </form>
                     
        </div>    
        
    </section>   
</template>

<script>

import { store } from "../../../store/store"

export default {

    name: 'add-course',

    data(){
        return{

            courses: {

                options: [
                    {name: "CNA", type: 'Day', dates: []},
                    {name: "CNA", type: 'Evening', dates: []},
                    {name: "CNA", type: 'Weekends', dates: []}
                ]
            }                      
        }
    },
    //https://jsfiddle.net/tunom37u/4/
    methods:{
        addCourses(){
            if(this.courses.options.length>0){
                debugger
                         
                this.$store.dispatch('addCourse', this.courses.options)     
                
                this.$router.push({name:'course-schedule'})
            }
        }
    }
}
</script>
