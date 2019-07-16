import axios from 'axios'

const state = {
    student:{},
    studentIds: [],
    students: [],
    transfer:{
        course_id: "",
        student_id: ""
    }
}

const getters = {
    getStudent: state => state.student,
    getDailyRegistrations: state => state.students,
    getTransfer: state => state.transfer
}

const mutations = {
    TO_TRANSFER(state, payload){
        state.transfer.course_id = payload.course_id,
        state.transfer.student_id = payload.student_id
    },

    ADD_STUDENT (state, payload){
        let student_dob = new Date(payload.birthdate)
        let month = student_dob.getMonth()+1
        let day = student_dob.getDate()
        let year = student_dob.getFullYear()
       debugger
        payload.birthdate = year +'-'+ ("0" + (month)).slice(-2)+'-'+ day
        //let reducer = (accumulator, currentValue) => accumulator + currentValue
        payload.course_id = payload.payments[0].course_id._id
        payload.payments = 0
        
        state.student = payload
    },

    ADD_TO_STUDENTS (state, payload){
        payload.forEach(item =>{
            if(!state.studentIds.includes(item._id)){
                debugger
                state.students.unshift(item)
                state.studentIds.unshift(item._id)
            }
        })
       // state.students.concat(payload)
    },

    REMOVE_STUDENT: (state, payload) => state.students.splice(state.students.indexOf(payload), 1)
}

const actions = {

    async searchStudent({commit}, payload){
        
        try{
            debugger
            const response = await axios({
                url: `http://localhost:3000/students/search`,
                method: "post",
                data: payload,
                headers: {"Content-Type":"application/json"}
            })

            debugger
            commit('ADD_STUDENT', response.data.student)
        }catch(error){
            error
        }
    },

    async getStudent({commit}, payload){
        try{
            debugger
            const response = await axios({
                url: `http://localhost:3000/students/${payload}`,
                method: 'get',
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            debugger
            commit('ADD_STUDENT', response.data.student)

        }catch(error){
            error
        }
    },

    async getDailyRegistrations({commit}){
        try{
            debugger
            const response = await axios({
                method: 'get',
                url: 'http://localhost:3000/students',
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            debugger
            commit('ADD_TO_STUDENTS', response.data.students)
        }catch(error){
            error
        }
    },

    async updateStudent({commit}, payload){
        const response = await axios({
            data: payload,
            url: 'http://localhost:3000/students',
            method: 'patch', 
            headers: {
                'Content-Type': 'application/json'
            }
            
        })
        debugger
        commit('ADD_STUDENT', response.data.student)
    },
    
    async transferStudent({commit}, payload){
        //try{
            debugger
            const response = await axios({
                data: payload,
                url: `http://localhost:3000/students/transfer`,
                method: 'patch', 
                headers: { 'Content-Type': 'application/json' }          
            })

        debugger
        commit('ADD_STUDENT', response.data.student)

        // }catch(error){
        //     console.log(error)
        //     throw new Error(error)
        // }        
    },

    async unenrollStudent({commit}, payload){
        const response = await axios({
            data: payload,
            url: `http://localhost:3000/students/unenroll/${payload.course_id}`,
            method: 'patch', 
            headers: {
                'Content-Type': 'application/json'
            }
            
        })
        debugger
        commit('ADD_STUDENT', response.student)
    }
}

export default { state, getters, mutations, actions }