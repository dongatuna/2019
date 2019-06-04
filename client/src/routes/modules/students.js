import RegisterStudent from '../../components/admin/student/RegisterStudent.vue'

export default [
    {
        path: '/student_register/:course_id', 
        name:'register-student', 
        props:{edit:false}, 
        component: RegisterStudent,
        meta:{
            requiresAuth: true
        }
    },

    {   
        path: '/student_edit/:student_id', 
        name: 'edit-student', 
        props:{edit: true}, 
        component: RegisterStudent,
        meta:{
            requiresAuth: true
        }
    } //edit, read student
]