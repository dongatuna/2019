import axios from 'axios'

const state = {
    course: {},
    courses: [],
    courseIds:[],
    sortedCourses: {
        Day:[],
        Evening:[],
        Weekends:[] 
    },
}

const getters = {
    //retrieve course/s in the state
    getCourse: state => state.course,
    getAllCourses: state => state.courses,
    getCourseIds: state => state.courseIds,
    getAllSortedCourses: state => state.sortedCourses
}

const mutations = {
    ADD_COURSE: (state, payload) => state.course = payload,
    ADD_TO_COURSES(state, payload){
       // debugger
        payload.forEach(item =>{

            if(!state.courseIds.includes(item.courseId)){
               // debugger
                state.courseIds.push(item.courseId)

                state.courses.push(item);
                state.sortedCourses[item.type].push(item);
            } 
           // console.info(state.sortedCourses)
        })               
    },
    ADD_COURSES:(state, payload) => state.courses.push(payload),
    REMOVE_COURSE: (state, payload) => state.courses.splice(state.courses.indexOf(payload), 1)
}

const actions = {
    
    async getAllCourses({commit}){
        try{
            const responses = await axios.get('/courses')
            
            debugger
            commit("ADD_TO_COURSES", responses.data.courses)

        }catch(error){
            error
        }
    },

    async getCourse({commit}, payload){
        try{

            const response = await axios.get(`/courses/${payload}`)

            debugger
            commit("ADD_COURSE", response.data.course)

        }catch(error){
            error
        }
    },   

    async addCourse({commit}, payload){
        try{

            const response = await axios({
                method: 'post',
                url: `/courses`,
                data: payload,
                headers:{                   
                    'Content-Type': 'application/json'                    
                }
            })
            
            debugger
            commit('ADD_COURSES', response.newCourse)
        }catch(error){
            error
        }
    },

    async deleteCourse({commit}, payload){
        try{
            const response = await axios({
                method: 'delete',
                url: `/courses/${course_id}`,
                data: payload,
                headers:{                  
                    'Content-Type':'application/json'                    
                }
            })

            debugger
            commit('REMOVE_COURSE', response.id)

        }catch(error){
            error
        }
    },

    async updateCourse({commit}, payload){
        try{
            const response = await axios({
                method: 'PATCH',
                url: `/courses/update/${payload.course_id}`,
                data: payload,
                headers:{                    
                    'Content-Type':'application/json'                    
                }
            })
            debugger
            commit('ADD_COURSE', response.course)
        }catch(error){
            
        }
    },

    async selfCourseSignUp({commit}, payload){
        try{

            const response = await axios({
                    method: 'post',
                    url: `/courses/${payload.course_id}`,
                    data: payload.student,
                    headers:{
                        'Content-Type':'application/json'                    
                  }
            })

            debugger
            commit("ADD_COURSE", response)

        }catch(error){
            error
        }
    },

    async adminCourseSignUp({commit}, payload){
        try{
            debugger
            const response = await axios({
                method: 'post',
                url: `/courses/admin/${payload.course_id}`,
                data: payload.student,
                headers:{
                   'Content-Type':'application/json'                    
                }
            })

        debugger
        commit("ADD_COURSE", response)

        }catch(error){
            error
        }
    }

}

export default {state, getters, mutations, actions}