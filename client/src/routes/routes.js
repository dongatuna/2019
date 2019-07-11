// import AdminSignIn from '../components/site/AdminSignIn.vue'
// import AdminSignUp from '../components/site/AdminSignUp.vue'
import Home from '../components/site/Home.vue'
import Jobs from '../components/site/Jobs.vue'
import Questions from '../components/site/Questions.vue'
import Schedule from '../components/site/Schedule.vue'
import SelfSignUp from '../components/site/SelfSignUp.vue'
import SignIn from '../components/site/SignIn.vue'
import SignUp from '../components/site/SignUp.vue'
import Videos from '../components/site/Videos.vue'
import Forgot from '../components/site/ForgotPW.vue'
import Reset from '../components/site/ResetPW.vue'
import Confirm from '../components/site/Confirm.vue'
import CheckEmail from '../components/site/CheckEmail.vue'
import WhyPost from '../components/site/WhyPost.vue'


export default [
    {path: '/', name: "home", component: Home},  
    {path: '/embaadmins', name: 'admin', component: SignIn, props:{admin: true}},
    {path: '/33/embaadmins', name: 'adminsignup', component: SignUp, props:{admin: true}},    
    {path: '/jobs', name: 'jobs', component: Jobs},     
    {path: '/questions', name: 'questions', component: Questions},
    {path: '/schedule', name: 'schedule', component: Schedule},
    {path: '/forgot', name: 'forgot', component: Forgot},
    {path: '/reset/:token', name: 'reset', component: Reset},
    {path: '/confirm/:token', name: 'confirm', component: Confirm},
    {path: '/register/:course_id', name: "register", component: SelfSignUp},    
    {path: '/signin', name: 'signin', component: SignIn, props:{admin: false}},
    {path: '/signup', name: 'signup', component: SignUp, props:{admin: false}},
    {path: '/checkemail', name: 'checkemail', component: CheckEmail},
    {path: '/videos', name: 'videos', component: Videos},
    {path: '/whypost', name: 'whypost', component: WhyPost}  
]