import axios from 'axios'

const state = {
    authed: false,
    role: undefined,
    username: undefined,
    message: undefined    
}

const getters = {   
    getUser: state => state.username,
    getRole: state => state.role,
    getMessage: state => state.message,
    getStatus: state => state.authed      
}

const mutations = {
    IS_USER(state, payload){        
        state.authed = payload.confirmed,
        state.username = payload.username,
        state.role = payload.role
    },

    MESSAGE(state, payload){
        state.message = payload
    },

    REMOVE_MESSAGE (state){
        state.message = ''
    },

    REMOVE_USER (state) {
        state.authed = false,
        state.role = undefined,
        state.username = undefined,
        state.message = undefined
    }
}

const actions = {

    async signUp({commit}, payload){
        try{
            
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/user/signup',
                data: payload,
                withCredentials: true,
                headers: { "Content-Type" : "application/json" }
            })            
            debugger

            if(response.data.hasOwnProperty('message')){
                debugger
                commit("MESSAGE", response.data.message)
            }else{
                commit('IS_USER', response.data.results)
            }          
            
        }catch(error){
            error
        }
    },

    async signIn({commit}, payload){
        try{
            debugger
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/user/signin',
                data: payload,
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })

            debugger
            if(response.data.hasOwnProperty('message')){
                debugger
                commit("MESSAGE", response.data.message)
            }else{
                commit('IS_USER', response.data.results)
            }
        }catch(error){
            error
        }
    },

    async checkUserStatus({commit}){
        try{
            debugger
            await axios({
                method: 'get',
                url: 'http://localhost:3000/user/status',                
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })    
            
            debugger
            //commit('IS_USER' )
            
        }catch(error){
            error
        }
    },

    async logOut({commit}){
        try{
            debugger
            
            await axios({
                method: 'get',
                url: 'http://localhost:3000/user/signout',
                withCredentials: true,
                headers: {"Content-Type": "application/json"}           
            })               
            
            debugger
            commit('REMOVE_USER')

        }catch(error){
            error
        }
    },

    async forgot({commit}, payload){
        try{
            debugger
            
            const res = await axios({
                method: 'post',
                url: 'http://localhost:3000/user/forgot',
                data: payload,
                withCredentials: true,
                headers: { "Content-Type" : "application/json" }           
            })               
            
            debugger
            commit("MESSAGE", res.data.message)

        }catch(error){
            error
        }
    },

    async reset({commit}, payload){
        try{
            debugger
            
            const response = await axios({
                method: 'post',
                url: `http://localhost:3000/user/reset/${payload.token}`,
                data: payload.credentials,
                withCredentials: true,
                headers: {"Content-Type": "application/json"}           
            })               
            
            debugger
            if(response.data.hasOwnProperty('message')){
                debugger
                commit("MESSAGE", response.data.message)
            }else{
                commit('IS_USER', response.data.results)
            }

        }catch(error){
            error
        }
    },


    async addUser({commit}, payload){
        try{
            debugger
            
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/user/confirm/'+payload  ,
                withCredentials: true,
                headers: {"Content-Type": "application/json"}           
            })               
            debugger
            commit('IS_USER', response.data.results)

        }catch(error){
            error
        }
    }

}

export default { state, getters, mutations, actions }