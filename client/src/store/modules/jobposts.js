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
}

const mutations = {

    CLEAR_POST:(state)=>state.post = {},
    ADD_POSTS:(state, payload)=>state.posts=payload,
    ADD_POST:(state, payload)=>state.post = Object.assign(payload),
    ADD_FILES (state, payload){
        Array.from(payload).forEach(file => {
                           
            //console.info("What is in the file? ", file)
            debugger
            //formData.append('fileattachments', file  )
            
            state.job_files.push(file)
            state.file_names.push(file.name)
            debugger
        })   
    },
    REMOVE_POST (state) {
        state.job_files = [],
        state.file_names = [],
        state.posts = [],
        state.post = {}   
    }
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
            commit('REMOVE_POST')
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
            commit('REMOVE_POST')

            commit("POSTS", response.data.jobs)
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
            commit('REMOVE_POST')
            debugger
            commit("ADD_POST", response.data)
        }catch(error){
            console.log(error)
        }
    },

    async deletePost({commit}, payload){
        try{
            const response = await axios( {            
                method: 'delete',
                url: 'http://localhost:3000/jobs/'+ payload,
                headers: {'Content-Type':'application/json'}
            } )

            commit("REMOVE_POST", response.data)

        }catch(error){
           console.log(error)
        }
    },

    async editPost({commit}, payload){
        try{
            debugger
            const response = await axios({
                method: 'patch',
                url: 'http://localhost:3000/jobs/'+payload.id,
                data: payload.data,
                headers: {'Content-Type':'multipart/form-data'}
            } )
            commit('REMOVE_POST')
            debugger
            commit("UPDATE_POST", response.data)

        }catch(error){
            console.log(error)
        }
    }
}

export default{
    state, getters, mutations, actions
}