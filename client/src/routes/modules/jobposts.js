import PostJob from "../../components/jobs/PostJob.vue"
import PreviewJob from '../../components/jobs/PreviewJob.vue'
import ViewJob from '../../components/jobs/ViewJob.vue'
import ListJobs from '../../components/jobs/ListUserJobs.vue'
import AdminJobs from '../../components/jobs/EmployerAdmin.vue'
import Courses from '../../components/jobs/Courses.vue'

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
                path: '/editjob', name: "editJob", component: PostJob, props:{edit: true}, meta: {requiresAuth:true }
            },

            {
                path: '/previewjob', name: 'previewJob', component: PreviewJob,  meta: { requiresAuth:true }
            },

            {
                path: '/postjob', name: "postJob", component: PostJob, props: {edit: false}, meta: { requiresAuth:true }                
            }
            
        ]
    },  

    {
        path: '/jobs/:id', name:'viewJob', component: ViewJob
    } 
       
]