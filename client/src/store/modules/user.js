import axios from 'axios'

const state = {
    user: false,
    role: ""
    
}

const getters = {   
    getUser: state => state.user,
    getRole: state => state.role    
}

const mutations = {
    IS_USER(state, payload){        
        state.user = payload.success,
        state.role = payload.role
    },

    REMOVE_USER (state) {
        state.user = false,
        state.role = ""
        
    }
}

const actions = {

    async signUp({commit}, payload){
        try{
            
            const response = await axios({
                method: 'post',
                url: '/user/signup',
                data: payload,
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })            
            debugger
            commit('IS_USER', response.data)
        }catch(error){
            error
        }
    },

    async signIn({commit}, payload){
        try{
            const response = await axios({
                method: 'post',
                url: '/user/signin',
                data: payload,
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })

             debugger
             commit('IS_USER', response.data )
        }catch(error){
            error
        }
    },

    async checkUserStatus(){
        try{
            debugger
            await axios({
                method: 'get',
                url: '/user/status',                
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
                    url: '/user/logout'  ,
                    withCredentials: true,
                    headers: {"Content-Type": "application/json"}           
            })               
            
            commit('REMOVE_USER')

        }catch(error){
            error
        }
    }

}

export default { state, getters, mutations, actions}