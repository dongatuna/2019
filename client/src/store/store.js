import Vue from 'vue'
import Vuex from 'vuex'
import admin from './modules/admin'
import courses from './modules/courses'
import jobposts from "./modules/jobposts"
import students from "./modules/students"
import user from "./modules/user"

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules:{
        admin, courses, jobposts, students, user
    }
})