import axios from 'axios'

const state = {  
    posts: [] ,
}

const getters = {
    /*
        in the computed properties in the vue  
            - sort events by user
            - get the property length
    */
   
    getPosts: state =>state.posts,     
    numberofPosts: state =>state.posts.length
}

const mutations = {

    POSTS:(state, payload)=>state.posts = payload,
    ADD_POST:(state, payload)=>state.posts.unshift(payload)
}

const actions = {

    async getPostById({commit}, payload){
        try{
            const response = await axios({
                method: 'get',
                url: "/jobs/read/"+payload,
                headers: {"Content-Type":"application/json"}
            })

            commit("POSTS", response.data);
        }catch(error){
            console.log(error)
        }
    },

    async getUserPosts({commit}, payload){
        try{
            const response = await axios({
                method: 'get',
                url: "/jobs/"+payload,
                headers: {"Content-Type":"application/json"}
            })

            commit("POSTS", response.data);
        }catch(error){
            console.log(error)
        }
    },

    async getAllPosts({commit}){
        try{
            const response = await axios({
                method: 'get',
                url: '/jobs',
                headers: {"Content-Type":"application/json"}
            })

            commit("POSTS", response.data);
        }catch(error){
            console.log(error)
        }
    },

    async addPost ({commit}, payload){
        try{
            debugger
            const response = await axios({
                method: 'post',
                url: 'http://localhost:3000/jobs', 
                data: payload,
                headers: {'Content-Type':'multipart/form-data'}
            } )
            debugger
            commit("ADD_POST", response.data);
        }catch(error){
            console.log(error)
        }
    },

    async deletePost({commit}, payload){
        try{
            const response = await axios( {            
                method: 'delete',
                url: '/jobs/'+ payload,
                headers: {'Content-Type':'application/json'}
            } )

            commit("REMOVE_POST", response.data)

        }catch(error){
           console.log(error)
        }
    },

    async editPost({commit}, payload){
        try{
            const response = await axios({
                method: 'patch',
                url: '/jobs/'+payload,
                headers: {'Content-Type':'application/json'}
            } )

            commit("UPDATE_POST", response.data)

        }catch(error){
            console.log(error)
        }
    }
}

export default{
    state, getters, mutations, actions
}