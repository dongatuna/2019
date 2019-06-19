const mongoose = require('mongoose')
const Job = require("../models/job")
const User = require('../models/user')

module.exports = {
    
    postJob: async(req, res, next)=>{
        try{
            console.log('REQ FILES', req.files, 'req files', req.fileattachements)
            console.log('here is the req body ', req.body)
            const {userId, title, description, requirements, location, contact, fileattachements} = req.body
            
            // const attachments = []
            // fileattachements.forEach(attachment=>{
            //     console.log(attachment)
            //     attachments.push(attachment.path)
            // })
            
            const user = await User.findById(userId)

           // console.log(user)
            if(user){

                const job = new Job({
                   // _id: mongoose.Types.ObjectId(),                    
                    contact,
                    description,
                    fileattachements,
                    location, 
                    requirements,                                      
                    title,
                    userId
                })
    
                await job.save()
    
                res.status(201).json({ job }) 

            }else{
                res.status(401).json({message: "You should first log in to create a job posting."})
            }                              
        }catch(error){
            res.status(500).json({
                message: "There has been an error saving your event",
                error
            })
        }
    },

    //read single job
    readJobById: async(req, res, next)=>{
        
        try{            
            const id = req.params.id;
            const job = await Job.findById(id)/*.populate('userId', 'name')*/;

            res.status(200).json({
                message: "Here is the event you requested",
                //Presenter: commEvent.userId.name,
                job,
                request: {
                    message: "To see all the events, click the link below",
                    type: "GET",
                    url: 'http://localhost:3000/events'
                }
            })
        }catch(error){
            res.status(500).json({
                message: "There has been an error in your request",
                error
            })
        }
    },

    //read all the jobs
    allJobs: async(req, res, next)=>{        
        try{            
            const jobs = await Job.find({}).sort({createdAt: 'desc'}) /*.populate("userId", "name");*/

            //Job.find({})
            //.exec()
            //.then(jobs=>{
    
            //}).error(err=>{
              //  console.log(console.error();
                //)
            //})

            if(jobs.length <1){
                return res.status(404).json({
                    message: "No jobs at this moment.  Check back later."
                })
            }

            res.status(200).json({
                jobs
            })         

        }catch(error){
            res.status(500).json({
                message:"There has been an error fetching the data",
                error
            })
        }
    },
    
    //update a communityEvent
    updateJob: async(req, res, next)=>{
        
        try{
            
            await Job.findByIdAndUpdate(req.params.id, req.value.body,{new: true})
            //console.log and check if communityEvent is ok
           

            res.status(200).json({
                request:{
                    message:  "To see your updated event, click link below",
                    type: "GET",
                    link: "http://localhost:3000/events"+id
                }
            })

        }catch(error){
            res.status(500).json({
                message: "There has been an error updating the resume",
                error
            })
        }
    },

    //delete a job
    deleteJob: async(req, res, next)=>{
        
        try{
            const id = req.params.id;
            const result = await Job.remove({_id: id});

            if(result.ok){
                res.status(200).json({
                    message: "The job has been removed",
                    request:{
                        message: "Use the url link below to create a new event",
                        type: "POST",
                        link: "http://localhost:3000/events"
                    }
                })
            }

        }catch(error){
            res.status(500).json({
                message: "There has been an error deleting your job",
                error
            })
        }

    },

    jobsByUser: async(req, res, next)=>{
        try{
            const jobs = await Job.find({userId: req.params.user_id}).sort({createdAt: 'desc'})

            if(jobs.length<1){
                return res.status(400).json({
                    message: "You have no events you have created at this moment",
                    request:{
                        type: "GET",
                        message: "Click on the link below to create an event",
                        link: "http://localhost:3000/events"
                    }            
                })
            }

            res.status(200).json({ jobs })           
            
        }catch(error){
            res.status(500).json({
                message: "There has been an error fetching jobs",
                error
            });
        }
    }

}