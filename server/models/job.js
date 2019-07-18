const mongoose = require('mongoose')
const moment = require('moment')
const Student = require('./student')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("")

const jobSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: {type:String, required: true},
    contact: {type:String, required: true},
    description: {type:String, required: true},
    requirements: {type:String, required: true},
    location: {type: String, required: true},
    chargeId: {type: String, required: true}
    //fileattachments: [String],
    //paths: [String]
    //display: {type: Boolean, required: true, default: false}
})

// jobSchema.methods.sendJobs = async function(jobs){
//     const students = Student.find({})


// }

jobSchema.statics.selectJobs = async function(){

    const day_start = moment().subtract(1,'days').startOf('day')//.toString()
    const day_end = moment().subtract(1,'days').endOf('day')
    
    const allJobs = this.find({$and:[{createdAt: {$gte: day_start}}, {createdAt: {$lte: day_end}}]})

    const students = Student.find({})    

    if(allJobs.lenght>0){

        students.forEach(student => {
            const msg = {
                to: student.email,
                from: 'jobs.at.excel@gmail.com',
                templateId: 'd-e9571d4b6dfc46f0ad3b7789861b984d',
                dynamic_template_data: {
                    jobs: allJobs,
                    name : student.first+ ' ' +student.last                    
                },
            }

            sgMail.send(msg)
        })
    }

    
    //const todayJobs = allJobs.filter(job=>job.createdAt)
}

module.exports = mongoose.model("Job", jobSchema)