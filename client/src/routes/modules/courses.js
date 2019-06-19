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
          meta: {requiresAdminAuth: true},
          children: [
               {path: '', name: 'daily-registrants', component: DailyRegistrations, 
                    meta: {requiresAdminAuth: true}}, 
                    
               {path: '/courses', name: 'course-schedule', component: CourseSchedule,
                    props:{transfer: false},
                    meta: {requiresAdminAuth: true}}, //
               
               {path: '/transfer', name: 'transfer', component: CourseSchedule,
                    props:{transfer: true},
                    meta: {requiresAdminAuth: true}}, 
               
               {path: '/course/add', name: 'add-course', component: AddCourse,
                    meta: {requiresAdminAuth: true}}, //add                    
                    
               {path: '/edit_course/:course_id', name: 'edit-course', component: EditCourse, //uses patch
                    meta: {requiresAdminAuth: true}}, 
               
               {path: '/course/:course_id', name: 'view-course-students', component: ViewCourseStudents, //uses get
                    meta: {requiresAdminAuth: true}}, 
                    
          ]
     
     }, //read daily registrations
     
     
]