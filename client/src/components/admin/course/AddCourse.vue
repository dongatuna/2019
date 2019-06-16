<template>
    <section class="bg-light text-dark mt-3">
        <!--COURSE START AND END DATES-->
        <div class="container-fluid">

            <form action="">
                <div class="justify-content-center"> 
                    <div class="row ">
                        <div class="col-sm-12">
                            <h3 class="diplay">Select course to add dates</h3>
                            <hr><br>
                            <select v-model="selected"  class="form-control form-control-lg">
                                <option v-for="(choice, index) of choices" :key="index">{{choice}}</option>                               
                            </select>
                        </div>                
                    </div>
                    <br><br>
                    <div class="row">                                             
                        <div class="col-md">
                            <p class='display-text'>Day Classes</p>
                            <div class="form-group">
                                
                                <input type="text" class="form-control" name="row11" v-model="courses[0].dates[0]">
                            </div>
                            <div class="form-group">
                                
                                <input type="text" class="form-control" name="row21" v-model="courses[0].dates[1]">
                            </div>
                            <div class="form-group">
                                
                                <input type="text" class="form-control" name="row31" v-model="courses[0].dates[2]">
                            </div>
                        </div>            
                        
                        <div class="col-md">
                            <p class='display-text'>Evening Classes</p>
                            <div class="form-group">
                                
                                <input type="text" class="form-control" name="row12" v-model="courses[1].dates[0]">
                            </div>
                            <div class="form-group">
                                
                                <input type="text" class="form-control" name="row22" v-model="courses[1].dates[1]">
                            </div>
                            <div class="form-group">
                            
                                <input type="text" class="form-control" name="row32" v-model="courses[1].dates[2]">
                            </div>
                        </div>

                        <div class="col-md">
                            <p class='display-text'>Weekend Classes</p>
                            <div class="form-group">
                            
                                <input type="text" class="form-control" name="row13" v-model="courses[2].dates[0]">
                            </div>
                            <div class="form-group">
                                
                                <input type="text" class="form-control" name="row23" v-model="courses[2].dates[1]">
                            </div>
                            <div class="form-group">
                            
                                <input type="text" class="form-control" name="row33" v-model="courses[2].dates[2]">
                            </div>
                        </div>  
                    </div>
                    <div class="row ">
                    <div class="col-md-9">                    
                        <button class="btn btn-primary btn-block py-3" type="submit" v-on:click="addCourses"><strong>Add Courses</strong> </button>
                    </div>                
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
            selected: "",
            choices: ["CNA", "Adult CPR/FA", "Infant, Child, Adult CPR/FA", "Basic Life Support (BLS)"],

            courses: [
                    {type: 'Day', dates: []},
                    {type: 'Evening', dates: []},
                    {type: 'Weekends', dates: []}
            ]         
        }
    },
    //https://jsfiddle.net/tunom37u/4/
    methods:{
        addCourses(){
            if(this.courses.length>0){
                debugger
                         
                this.$store.dispatch('addCourse', {name: this.selected, courses:this.courses})     
                
                this.$router.push({name:'course-schedule'})
            }
        }
    }
}
</script>
