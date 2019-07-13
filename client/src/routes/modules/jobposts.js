import PostJob from "../../components/jobs/PostJob.vue"
import PreviewJob from '../../components/jobs/PreviewJob.vue'
import ViewJob from '../../components/jobs/ViewJob.vue'
import ListJobs from '../../components/jobs/ListUserJobs.vue'
import AdminJobs from '../../components/jobs/EmployerAdmin.vue'
import Courses from '../../components/jobs/Courses.vue'
import Checkout from '../../components/jobs/Checkout.vue'
import CheckoutReceipt from '../../components/jobs/CheckoutReceipt.vue'
import JobTips from '../../components/jobs/JobTips.vue'


export default [   

    {
        path: '/adminjobs',
        name: 'adminJob',
        component: AdminJobs,
        meta: {requiresAuth: true},
        children: [     
            {
                path: '',  name: 'listJobs', component: ListJobs, meta: {requiresAuth:true}                
            },   

            {
                path: '/caregiver_courses', name: "caregiver-courses", component: Courses, meta: { requiresAuth:true }              
            },

            {
                path: '/checkout', name: "checkout", component: Checkout, meta: { requiresAuth:true }              
            },

            {
                path: '/editjob', name: "editJob", component: PostJob, props:{edit: true}, meta: {requiresAuth:true }
            },

            {
                path: '/repost', name: "repost", component: PostJob, props:{edit: true}, meta: {requiresAuth:true }
            },

            {
                path: '/previewjob', name: 'previewJob', component: PreviewJob, props:{repost: true}, meta: { requiresAuth:true }
            },

            {
                path: '/preview', name: 'preview', component: PreviewJob, props:{repost: false}, meta: { requiresAuth:true }
            },

            {
                path: '/postjob', name: "postJob", component: PostJob, props: {edit: false}, meta: { requiresAuth:true }                
            },
            
            {
                path: '/receipt', name: "receipt", component: CheckoutReceipt, meta: { requiresAuth:true }              
            },
            
            {
                path: '/tips', name: "tips", component: JobTips, meta: { requiresAuth:true }              
            }   
            
        ]
    },  

    {
        path: '/view/:id', name:'viewJob', component: ViewJob
    } 
       
]