const mongoose = require('mongoose')
const cfg = require('../config')
const twilio = require('twilio')
const client = new twilio(cfg.TWILIO.account_SID, cfg.TWILIO.auth_Token)
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("")


const courseSchema = mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId,    
    name: {type: String, required: true},
    type: {type:String, enum: ['Day', 'Evening', 'Weekends']},
    start_date: {type: Date, required: true},
    end_date: {type: Date, required: true},
    students: [{type: mongoose.Schema.Types.ObjectId, ref: "Student"} ]
})

/**
 * Find courses with a start date in 3 days
 */
courseSchema.methods.decideNotificationType = async function(){
    try{

        let timeDifference =  new Date(this.start_date).getTime() - new Date().getTime() 

        console.log("Time difference in days", Math.ceil(timeDifference/(1000 * 60 * 60 * 24)))
        let results = {}
        switch(Math.ceil(timeDifference/(1000 * 60 * 60 * 24))){

            //send email notification
            case 3:
                results.course = this
                results.type = 'email'
                break
            
            case 1:
                results.course = this
                results.type = 'text'
                break
            default:
                results = null
               
        }    
        
        return results
    }catch(error){st
        throw new Error(error)
    }   
}

courseSchema.methods.sendNotifications = async function(type, students){
    
    try{
                
        switch(type ){
            
            //send text
            case 'text':               

                students.forEach(student => {
                    client.messages.create(
                            {
                                body: `Greetings! The class you signed up for will start tomorrow.  Call 2062711946 if you have any question.`,
                                from: '2066934343',  
                                to: `+${student.tel}`
                            }
                        ).then(message => console.log(message.sid))
                        .catch(error => console.log(error))
                })
                
            break
            //send email
            case 'email':

                students.forEach(student => {
                    const msg = {
                        to: student.email,
                        from: 'jobs.at.excel@gmail.com',
                        subject: `Upcoming course`,
                        text: `Hello ${student.first} ${student.last}, This is a reminder that the class you signed up for will start in a few days `
                    }
                })  

            break
        }
    }catch(error){
        console.log("error in the inside async")
        throw new Error(error)
    }           
     
}

courseSchema.statics.selectCourses = async function(){
    try{
        const coursesArray = await this.find({})// replace Course with keyword 'this'
        
        for (course of coursesArray){
            
            if(course.students.length>0 ){
                
               // console.log("Here is the course: ", course)
                course.decideNotificationType()
                .then(results => {
                    
                   // console.log("Here are the course results course ids...", results.course._id)
                    if(results!==null){                     
                        
                        this.findById( results.course._id).populate('students', 'tel email first last')
                        .exec()
                        .then(res => {
                            console.log('Here are the CNA RESULTS: ', res.students)  
                            course.sendNotifications(results.type, res.students)
                        })                       
                    }
                })
                                                   
            } 
        }   
    }catch(error){
        throw new Error(error)
    }

}

module.exports = mongoose.model('Course', courseSchema)
