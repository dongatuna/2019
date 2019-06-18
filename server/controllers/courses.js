const mongoose = require('mongoose')
const Course = require('../models/course')
const Student = require('../models/student')
// const moment = require('moment')
// const Months = require('../helpers/months')
// const {Courses} = require('../helpers/courses')


module.exports = {

    addCourse: async(req, res, next ) => {
        try{          

            console.log("REQ BODY COURSES", req.body.courses)
            const name =  req.body.name
            const course_length = req.body.courses.length

            //console.log('name ', name, 'length ', course_length)
            const dbCourses = []
            for (let course_index = 0; course_index < course_length; course_index++){
                const type  = req.body.courses[course_index].type

                const dates_length = req.body.courses[course_index].dates.length

               // console.log('type ', type, 'dates length ', dates_length)

                if(dates_length>0){

                    for(let dates_index = 0 ; dates_index < dates_length; dates_index++){
                        
                        //console.log("Will you console log? ", req.body.courses[course_index].dates[dates_index])
                        const date = req.body.courses[course_index].dates[dates_index]

                        //console.log("Here is the date: ", date)
    
                        if(date){
                        
                            const course_dates = date.split(' ')
        
                            let today = new Date()
        
                            let start_date = new Date(course_dates[0] + ' ' + course_dates[1] + ', ' + today.getFullYear())           
                            
                             
                            switch(course_dates.length){
                                case 2:             
        
                                   dbCourses.push({name, type, start_date}) 
                                
                                    break
                                
                                case 5:
        
                                    let end_date = new Date(course_dates[3] + ' ' + course_dates[4] + ', ' + today.getFullYear()) 
                                    
                                   // console.log('name', name, 'type', type, 'start', start_date, 'end', end_date)
                                    dbCourses.push({name,  type, start_date, end_date})
        
                                    break
                            }
                        }  
                    }
                }
            }

           //console.log("Here are the db courses ", dbCourses)
     
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

            newStudent.payments.push({ 
                course_id: req.params.course_id
            })

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