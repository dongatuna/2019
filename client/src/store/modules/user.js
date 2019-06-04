import axios from 'axios'

const state = {
    user: "",
    token: localStorage.getItem('token')||null
}

const getters = {
   // getToken: state => state.token!==null,
    getUser: state => state.user,
    isLoggedIn:state => !!state.token
}

const mutations = {
    IS_USER(state, payload){
        state.token = payload.data.token,
        state.user = payload.data.user.email
    },

    REMOVE_USER (state,payload) {
        state.user= null,
        state.token = payload
    }
}

const actions = {

    async signUp({commit}, payload){
        try{
            debugger
            const response = await axios({
                method: 'post',
                url: '/user/signup',
                data: payload,
                headers: {"Content-Type": "application/json"}
            })

            response.data.token
            localStorage.setItem('token', response.data.token)
            axios.defaults.headers.common['Authorization'] = response.data.token    //maybe this sets the header Authorization to the token value for all the routes that require this...?

            commit('IS_USER', response )
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
                headers: {"Content-Type": "application/json"}
            })

            localStorage.setItem('token', response.data.token)
            axios.defaults.headers.common['Authorization'] = response.data.token    //maybe this sets the header Authorization to the token value for all the routes that require this...?

            debugger
            commit('IS_USER', response )
        }catch(error){
            error
        }
    },

    async logOut({commit}){
        try{
            debugger
            
            const response = await axios({
                    method: 'get',
                    url: '/user/logout'              
            })   
            
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            debugger
            commit('REMOVE_USER', response.data.token)

        }catch(error){
            error
        }
    }

}

export default { state, getters, mutations, actions}