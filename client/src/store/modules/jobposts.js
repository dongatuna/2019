import axios from 'axios'

const state = {
    job_files: [],
    file_names: [],
    posts: [],
    post: {}     
}


const getters = {
      
    getPosts: state =>state.posts, 
    getPost: state =>state.post,      
    numberofPosts: state =>state.posts.length,
    getFiles: state =>state.job_files,
    getFilesNames: state =>state.file_names
    //filePaths
}

const mutations = {

    CLEAR_POST:(state)=>state.post = {},
    ADD_POSTS:(state, payload)=>state.posts=payload,
    ADD_POST:(state, payload)=>state.post = Object.assign(payload),
    ADD_FILES: (state, payload) => state.job_files = payload, //this is the formdata file object
    
    
    //payload includes 
    //ADD_FILE_NAMES: (state, payload) => state.file_names = payload,
    //ADD_EXISTING_FILE_NAMES: (state, payload) => state.file_names = payload,
    //REMOVE_FILE_NAMES: (state) => state.file_names = [],
    REMOVE_POST (state, payload) {state.posts = state.posts.filter(post => post._id !== payload) }
}

const actions = {

    async getPostById({commit}, payload){
        try{
            const response = await axios({
                method: 'get',
                url: "http://localhost:3000/jobs/read/"+payload,
                headers: {"Content-Type":"application/json"}
            })

            commit("ADD_POST", response.data.job)
        }catch(error){
            console.log(error)
        }
    },

    async getUserPosts({commit}, payload){
        try{
            debugger
            const response = await axios({
                method: 'get',
                url: "http://localhost:3000/jobs/"+payload,
                headers: {"Content-Type":"application/json"}
            })
           // commit('REMOVE_POST')
            debugger
            commit("ADD_POSTS", response.data.jobs)
        }catch(error){
            console.log(error)
        }
    },

    async getAllPosts({commit}){
        try{
            const response = await axios({
                method: 'get',
                url: 'http://localhost:3000/jobs',
                headers: {"Content-Type":"application/json"}
            })
            //commit('REMOVE_POST')

            commit("ADD_POSTS", response.data.jobs)
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
            commit('CLEAR_POST')
            debugger
            commit("ADD_POST", response.data)
        }catch(error){
            console.log(error)
        }
    },

    async deletePost({commit}, payload){
        try{
            // const response = 
            await axios( {            
                method: 'delete',
                url: 'http://localhost:3000/jobs/'+ payload,
                headers: {'Content-Type':'application/json'}
            } )
            
            //state.posts.slice(index
            //ommit("REMOVE_POST", response.data)
            commit("REMOVE_POST", payload)

        }catch(error){
           console.log(error)
        }
    },

    async editPost({commit}, payload){
        try{
            debugger
            const response = await axios({
                method: 'patch',
                url: 'http://localhost:3000/jobs',
                data: payload,
                headers: {'Content-Type':'multipart/form-data'}
            } )
           // commit('REMOVE_POST')
            debugger
            commit("ADD_POST", response.data)

        }catch(error){
            console.log(error)
        }
    }
}

export default{
    state, getters, mutations, actions
}