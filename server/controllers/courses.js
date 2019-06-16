const mongoose = require('mongoose')
const Course = require('../models/course')
const Student = require('../models/student')
// const moment = require('moment')
// const Months = require('../helpers/months')
// const {Courses} = require('../helpers/courses')


module.exports = {

    addCourse: async(req, res, next ) => {
        try{

            const courses  = req.body
            console.log("COURSES ", courses)
            const courses_length = courses.length
            console.log("This is the courses' length...", courses_length)

            const dbCourses = []

            // req.body.reduce(course=>{

            // }, [])

            for(let index= 0; index < courses_length; index++){
                let type = courses[index].type
                let name = courses[index].name

                console.log(`We are in the for loop # 1`)

                    if(courses[index].dates.length>0){
                    
                    console.log(`We are in the first if`)
                    let dates = courses[index].dates
                                    
                    let dates_length = dates.length

                    for(let date_index = 0; date_index <= dates_length; date_index++){

                        console.log(`We are in the for loop # 2`)
                        if(dates[date_index]!=null){

                            let course_dates = dates[date_index].split(' ')
                                            
                            let today = new Date() ///new Date()

                            let start_date = new Date(course_dates[0]+' '+course_dates[1]+', '+today.getFullYear())
                
                            let end_date = new Date(course_dates[3]+' '+course_dates[4]+', '+today.getFullYear())              
                          
                            console.log("start ", start_date, "end date ", end_date)
                            let newCourse ={
                                //_id: mongoose.Types.ObjectId(),
                                name, type, start_date, end_date                     
                            }

                            dbCourses.push(newCourse)
                            
                        }
                    }
                }
            }     
            console.log(dbCourses)
            await Course.insertMany(dbCourses)

            res.status(201).json({
                message:  `To view the course you have added, visit it  to see the course.`,
                url: `http://localhost:3000/courses`,                                       
            })            

        }catch(error){
            res.status(500).json({
                message: `There has been an error adding the course.`,
                error
            })
        }
    },

    //add a student to a course - course MUST be created
    selfCourseSignUp: async(req, res, next ) => {
        try{
            //get the course id
            const course_id = req.params.course_id

            //check if there is a course with the associated course id
            const course = await Course.findById(course_id)

            //if the course does NOT exist, let the user know so - redirect to the courses page
            if(course==null){
                return res.status(401).json({
                    message: 'No course with that ID',
                    request:{
                        url: `To view courses for signing up, visit: http://localhost:8080/schedule`,
                        method: "GET"
                    }
                })
            }
            
            //get the req.body data
            const {tel, email, first, last, notes} = req.body
            
            const check = await Student.find({email})

           //check if the email exists - if it does, the user contacts administrator 
            if(check.length > 0){
                return res.status(401).json({
                    message: `${email} is in use.  Call administrator (206.271.1946) to sign up over the phone or in person.`
                })
            }

            const newStudent = new Student({
                _id: mongoose.Types.ObjectId(),
                tel, email, first, last, notes
            })

            course.students.push(newStudent._id)

            await Promise.all([ newStudent.save(), course.save() ]) 
               
            res.status(200).json({
                message: `You have successfully signed for the class.  Check your email for more information about what steps to take next.`,  
                course, newStudent             
            })

        }catch(error){
            res.status(500).json({
                message: `There has been an error adding the student.`,
                error
            })
        }
    },

    //add a student to a course - course MUST be created
    adminCourseSignUp: async(req, res, next ) => {
        try{
            //get the 
            const course = await Course.findById(req.params.course_id)

            //if the course does NOT exist, let the user know so - redirect to the courses page
            if(course==null){
                return res.status(401).json({
                    message: 'No course with that ID',
                    request:{
                        url: `To view courses for signing up, visit: http://localhost:3000/courses`,
                        method: "GET"
                    }
                })
            }
            
            //get the req.body data
            const {address, city, state, zip, tel, email, first, last, birthdate, notes} = req.body 
            
            const payments = []

            const amount = (req.body.payments!=='')? req.body.payments: 0.00

            const payObj = { 
                amount,
                course_id: req.params.course_id
            }
            
            payments.unshift(payObj)
            
            const registered = true

            const check = await Student.find({email})

           //check if the email exists - if it does, the user contacts administrator 
            if(check.length > 0){
                return res.status(401).json({
                    message: `${email} is in use.  Call administrator (206.271.1946) to sign up over the phone or in person.`
                })
            }         

            const newStudent = new Student({
                _id: mongoose.Types.ObjectId(),
                address, city, state, zip, tel, email, first, last, registered, birthdate, payments, notes
            })      
            console.log(`This is the new student: ${newStudent}`)
            //course.students = []
            course.students.unshift(newStudent._id)

            await Promise.all([newStudent.save(), course.save()])          
           
            res.status(200).json({
                message: `The student has been added.`,
                url: `localhost:3000/students/${newStudent._id}`,
                newStudent,
                course
            })

        }catch(error){
            res.status(500).json({
                message: `There has been an error adding the student.`,
                error
            })
        }
    },

    deleteCourse: async(req, res, next) => {
        try{
            const id = req.params.course_id

            await Course.remove({_id: id})

            res.status(201).json({
                id,
                message: `The course has been successfully removed.`,                
            })

        }catch(error){
            res.status(500).json({
                message: `There has been an error updating the course.`,
                error
            })
        }
    },

    getCourse: async(req, res, next ) => {
        try{

            const id = req.params.course_id
                        
            const course = await Course.findById(id).populate('students', '_id first last email tel ')          

            console.log("Course: ", course )
            res.status(201).json({
                message: `Course details`,
                course     
            })

        }catch(error){
            res.status(500).json({
                message: `There has been an error updating the course.`,
                error
            })
        }
    },
    
    getAllCourses: async(req, res, next ) => {
        try{

            const today = new Date()

            const courses = await Course.find({start_date:{$gte: today}}).sort({start_date:'ascending'})

           // console.log("Courses length", courses.length)
            if(courses.length>0){
                res.status(200).json({
                    message: `Course details`,
                    courses: courses.map(course =>{
                        
                        return{
                            courseId: course._id,
                            name: course.name,
                            type: course.type,
                            start_date: course.start_date,
                            end_date: course.end_date  
                        }                        
                     })                   
                })
            }else{
                res.status(201).json({
                    message: 'No courses at the moment'
                })
            }            

        }catch(error){
            res.status(500).json({
                message: `There has been an error getting the courses.`,
                error
            })
        }
    },

    updateCourse: async(req, res, next ) => {
        try{
            const id = req.params.course_id

            console.log("Here is the req body...", req.body)
            const course_dates = req.body.course_dates

            const dates = course_dates.split(' ')

            console.log("This is the date ", dates)
            const today = new Date()

            const start_date = new Date(dates[0]+' '+dates[1]+', '+today.getFullYear())

            const end_date = new Date(dates[3]+' '+dates[4]+', '+today.getFullYear())

            const course = await Course.findByIdAndUpdate(id, {$set:{start_date, end_date}}, {new: true})

            res.status(201).json({
                message:  `The course has been updated.`,
                url: `http://localhost:3000/courses/${course._id}`,
                course
            })
            
        }catch(error){
            res.status(500).json({
                message: `There has been an error updating the course.`,
                error
            })
        }
    }    
}