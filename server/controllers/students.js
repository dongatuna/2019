const mongoose = require('mongoose')
const Student = require('../models/student')
const Course = require("../models/course")
const {Courses} = require('../helpers/courses')
const Months = ('../helpers/months')

module.exports = {  
   
    updateStudent: async(req, res, next ) => {
        try{
            //get the param
            const student_id = req.body._id
            
            req.body.registered = true         
            
            const student = await Student.findById(student_id)         
            console.log("PAYMENTS", req.body.payments)   
           // console.log(student)
            if(req.body.payments !== 0  ){
                console.log("This is true", student.payments[0].course_id)
                const new_payment = {
                    "amount": req.body.payments,
                    "course_id": student.payments[0].course_id
                }
                console.log('THIS IS THE NEW PAYMENT ', new_payment)

                student.payments.push(new_payment)
             }
                       
            req.body.payments = student.payments
            console.log("LENGTH...", req.body.payments.length, 'TOTAL PAYMENTS...', req.body.payments)

            await Student.findOneAndUpdate({_id:student_id}, req.body, {new: true})           

            res.status(200).json({
                message: 'The student has been updated',
                url: `localhost:3000/students/${student._id}`,
                student
            })

        }catch(error){
            res.status(404).json({
                message: `There has been an error updating the student.`,
                error
            })
        }
    },

    getStudent: async(req, res, next) => {
        try{
            const id  = req.params.student_id

            const student = await Student.findById(id).populate('payments.course_id', 'course_name start_date end_date')

            let course_payment = 0.00
            for(let payment of student.payments){
                console.log("THIS IS A PAYMENT...", payment)
                course_payment += payment.amount//.toFixed(2)
            }
            console.log(parseFloat(course_payment).toFixed(2))

            console.log("Here is the student ", student)
            res.status(200).json({
                message: 'Here is the student you requested',
                url: `localhost:3000/students/${student._id}`,
                student
            })

        }catch(error){
            res.status(404).json({
                message: `There has been an error getting the student.`,
                error
            })
        }
    },
    //unenroll for the a class
    unenrollStudent: async(req, res, next) => {
        try{
            const course_id = req.body.course_id

            const student_id = req.body.student_id //this will be in the req.body from the front side

            const course = await Course.findById(course_id)

            course.students.splice(course.students.indexOf(student_id), 1)

            await course.save()

            const student = await Student.findById(student_id)

            for(payment of student.payments){
            
                if(payment.course_id.equals(course_id)){
                    console.log("Student is enrolled in this course...")
                    payment.course_id = null
                    //student.payments.splice(student.payments.indexOf(payment), 1)                    
                }
            }          
            
            await student.save()

            res.status(200).json({
                message: 'The student has been unenrolled',                
                student
            })

        }catch(error){
            res.status(404).json({
                message: `There has been an error unenrolling the student.`,
                error
            })
        }
    },

    transferStudent: async(req, res, next) => {
        try{

            const new_course_id = req.body.new_course_id            
            
            const old_course_id = req.body.old_course_id           

            const student_id = req.body.student_id //this will be in the req.body from the front side

            console.log("New course id: ", new_course_id, "Old course id: ", old_course_id, "Student id: ", student_id)

            if(old_course_id==new_course_id){
                return res.status(404).json({
                    message: 'Student is enrolled in the class you are trying to enroll them into.  Cannot transfer to student\'s current class',                
                })
            }

            const course  = await Promise.all([Course.findById(old_course_id), Course.findById(new_course_id)]) 

            console.log("Old course: ", course[0], "New course: ", course[1])
  
            course[0].students.splice(course[0].students.indexOf(student_id), 1)

            course[1].students.push(student_id)

            await Promise.all([course[0].save(), course[1].save()]) 

            const student = await Student.findById(student_id)

            for(payment of student.payments){
            
                if(payment.course_id.equals(old_course_id)){
                    console.log("Student is enrolled in this course...")
                    payment.course_id = new_course_id
                }
            }
 
            await student.save()

            res.status(200).json({
                message: 'The student has been transferred',                
                student
            })

        }catch(error){
            res.status(404).json({
                message: `There has been an error transfering the student.`,
                error
            })
        }
    },

    //daily registrations
    getDailyRegistrations: async( req, res, next ) => {
        try{

            var start = new Date()
            start.setHours(0,0,0,0)

            var end = new Date()
            end.setHours(23,59,59,999)
            
            const students = await Student.find({createdAt: {$gte: start, $lte: end}}).populate('payments.course_id', 'course_name start_date end_date').sort({createdAt: 'desc'})
      
            //check what we get from students array
            if(students.length < 1){
                return res.status(404).json({
                    message: 'There are no students'
                })
            }
            
            
            res.status(200).json({students}) 
                
        
        }catch(error){
            res.status(404).json({
                message: 'There has been an error getting daily registrations',
                error
            })
        }
    },

    //get weekly registrations
    getWeeklyRegistrations: async(req, res, next) => {

        try{

            const { n1, n2 } = req.body

            const firstDay = (n1 > 0) ? new Date(new Date() - 7* n1 * 60 * 60 * 24 * 1000) : new Date()
            const lastDay = new Date(new Date() - 7* n2 * 60 * 60 * 24 * 1000)

            const students = await Student.find({createdAt: {$gte: firstDay, $lte: lastDay}}).populate('payments.course_id', 'course_name start_date end_date')

            //check what we get from students array
            console.log('Here is the student array: ', students)
            if(students.length < 1){
                return res.status(404).json({
                    message: 'There are no students'
                })
            }

            res.status(200).json({
                //students
                message: "Here are the weekly registrations.",
                students: students.map(student=>{
                    return {
                        name: student.first+" "+student.last,
                        tel: student.tel,
                        email: student.email,
                        student_id: student._id,
                        payments: student.payments
                    }
                })
            })

        }catch(error){
            res.status(404).json({
                message: 'There has been an error getting weekly registrations',
                error
            })
        }       
    },

   //search student
   searchStudent: async(req, res, next ) => {
       try{
           // const email = req.body.email
            console.log("I have email", req.body.email)

            const email = req.body.email
            const student = await Student.findOne({email})

            console.log(`STUPID STUDENT ${student}`)
            if(!student){
                return res.status(404).json({
                    message: 'No student matches the email address'
                })
            }

            

            res.status(200).json({
                student
            })
       }catch(error){
            error
       }
   },

   //send text notifications
   
}