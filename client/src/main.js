import Vue from 'vue'
import VueRouter from 'vue-router'
import {store} from './store/store'
import siteroutes from './routes/routes'
import courseRoutes from './routes/modules/courses'
import jobRoutes from './routes/modules/jobposts'
import studentRoutes from './routes/modules/students'
import App from './App.vue'
import Axios from 'axios'
import Meta from 'vue-meta'


Vue.use(VueRouter)
Vue.use(Meta)

Vue.prototype.$http = Axios

const token = localStorage.getItem('token')

if(token){
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

const router = new VueRouter({
  routes:[
    ...siteroutes,
    ...courseRoutes,
    ...jobRoutes,
    ...studentRoutes,
    //...questionRoutes
  ],

  mode: "history",
  
  scrollBehavior(to, from, savedPosition){
    if(savedPosition){
      return savedPosition
    } else return{x: 0, y:0}
  }
})

router.beforeEach((to, from, next) =>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(store.getters.isLoggedIn){
      next()
      return
    }
    next('/embaadmins')
  }else{
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
