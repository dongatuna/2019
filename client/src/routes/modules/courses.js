import AddCourse from '../../components/admin/course/AddCourse.vue'
import Admin from '../../components/admin/Admin.vue'
import CourseSchedule from '../../components/admin/course/CourseSchedules.vue'
import EditCourse from '../../components/admin/course/EditCourse.vue'
import DailyRegistrations from '../../components/admin/course/DailyRegistrations.vue'
import ViewCourseStudents from '../../components/admin/course/ViewCourseStudents.vue'
export default [
     
     {
          path: '/admin', 
          name: 'admin_page', 
          component: Admin,
          meta: {requiresAuth: true},
          children: [
               {path: '', name: 'daily-registrants', component: DailyRegistrations, 
                    meta: {requiresAuth: true}}, 
                    
               {path: '/courses', name: 'course-schedule', component: CourseSchedule,
                    props:{transfer: false},
                    meta: {requiresAuth: true}}, //
               
               {path: '/transfer', name: 'transfer', component: CourseSchedule,
                    props:{transfer: true},
                    meta: {requiresAuth: true}}, 
               
               {path: '/course/add', name: 'add-course', component: AddCourse,
                    meta: {requiresAuth: true}}, //add              

               // {path: '/course/:course_id', name: 'read-course', component: ReadCourse,
               //      meta: {requiresAuth: true}}, //read specific course
                    
               {path: '/edit_course/:course_id', name: 'edit-course', component: EditCourse, //uses patch
                    meta: {requiresAuth: true}}, 
               
               {path: '/course/:course_id', name: 'view-course-students', component: ViewCourseStudents, //uses get
                    meta: {requiresAuth: true}}, 
                    
          ]
     
     }, //read daily registrations
     
     
]