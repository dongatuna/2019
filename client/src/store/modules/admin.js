import axios from 'axios'

const state = {
    admin: "",
    //admin_id: null,
    token: localStorage.getItem('token')||null
}

const getters = {
   // getToken: state => state.token!==null,
    getAdmin: state => state.admin,
    isLoggedIn:state => !!state.token
}

const mutations = {
    IS_ADMIN(state, payload){
        state.token = payload.data.token,
        state.admin = payload.data.admin.username
    },

    REMOVE_ADMIN (state,payload) {
        state.admin = null,
        state.token = payload
    }
}

const actions = {

    async adminSignUp({commit}, payload){
        try{
            debugger
            const response = await axios({
                method: 'post',
                url: '/admin/signup',
                data: payload,
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })

            debugger
            // response.data.token
            // debugger
            // localStorage.setItem('token', response.data.token)
            // axios.defaults.headers.common['Authorization'] = response.data.token    //maybe this sets the header Authorization to the token value for all the routes that require this...?

            debugger
            //commit('IS_ADMIN', response )
        }catch(error){
            error
        }
    },

    async adminSignUp({commit}, payload){
        try{
            debugger
            const response = await axios({
                method: 'get',
                url: '/admin/status',                
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            })            
            
        }catch(error){
            error
        }
    },

    async adminSignIn({commit}, payload){
        try{
            const response = await axios({
                method: 'post',
                url: '/admin/signin',
                data: payload,
                headers: {"Content-Type": "application/json"}
            })

            localStorage.setItem('token', response.data.token)
            axios.defaults.headers.common['Authorization'] = response.data.token    //maybe this sets the header Authorization to the token value for all the routes that require this...?

            debugger
            commit('IS_ADMIN', response )
        }catch(error){
            error
        }
    },

    async adminLogOut({commit}){
        try{
            debugger
            
            const response = await axios({
                    method: 'get',
                    url: '/admin/logout'              
            })   
            
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            debugger
            commit('REMOVE_ADMIN', response.data.token)

        }catch(error){
            error
        }
    }

}

export default { state, getters, mutations, actions}