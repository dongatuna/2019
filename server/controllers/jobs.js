const mongoose = require('mongoose')
const Job = require("../models/job")
const User = require('../models/user')
const config = require ('../config')
const stripe = require('stripe')(config.STRIPE.KEY)
//const Student = require('../models/user')


module.exports = {
    
    postJob: async(req, res, next)=>{
        try{        
            
            console.log('Here is the req.body ', req.body)
            //get the req.body
            const {stripeToken, poster, post} = req.body   
            
            const {email, first, last, tel } = poster

            const { contact, description, location, requirements, title } = post            

            const customer = await stripe.customers.create({             
                email,
                name: first + ' ' + last,
                phone: tel,
                source: stripeToken
            })

            console.log("customer ", customer)

            if(post.chargeId){
                post.chargeId = null
            }

            //create a new charge using the above newly created customer
            const charge = await stripe.charges.create({
                description: title,
                amount: 2500,
                currency: 'usd',
                customer: customer.id               
            })
            
            console.log("charge ", charge)
          
            if(charge){

                console.log("charge PPPP")
                //find the poster or user
                const user = await User.findById(req.user._id)

                // save job by user or poster
                if(user){

                    const job = new Job({
                        _id: mongoose.Types.ObjectId(),                    
                        contact, description, location, requirements, title,
                        userId: req.user._id,
                        chargeId: charge.id
                    })
        
                    await job.save()
                    
                    console.log('Here is the job you saved...', job)
                    res.status(201).json({ job }) 
                }
            }                                  
        }catch(error){
            res.status(500).json({
                message: "There has been an error saving your event",
                error
            })
        }
    },   
    
    //update a job
    updateJob: async(req, res, next)=>{
        
        try{
           
            console.log("Here is the req files ", req.files)
            console.log("Here is the req paths ", req.body)
           
        //    // const files = 
        //     //const paths = req.body.paths
        //     const url_paths = []    

        //     req.files.forEach(attachment=>{
        //         console.log("single attachment...", attachment.path)
        //         url_paths.push(attachment.path)
        //     })

        //     paths = req.body.paths     

        //     console.log(req.body)
            const job = await Job.findByIdAndUpdate(req.body._id, req.body, {new: true})
            //console.log and check if communityEvent is ok
           
            console.log("Here is the job ", job)

            res.status(200).json({job})
        }catch(error){
            console.log('The error...', error)
            res.status(500).json({
                message: "There has been an error editing your job post.",
                error
            })
        }
    },

    //delete a job
    deleteJob: async(req, res, next)=>{
        
        try{
           
            const result = await Job.remove({_id: req.params.id})

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
            
            const jobs = await Job.find({userId: req.params.id}).sort({createdAt: 'desc'})    

            if(jobs.length>0){
                res.status(200).json({ jobs })    
            }                  
            
        }catch(error){
            res.status(500).json({
                message: "There has been an error fetching jobs",
                error
            });
        }
    },

     //read single job
     readJobById: async(req, res, next)=>{
        
        try{            
            //const id = 
            const job = await Job.findById(req.params.id)

            if(job){
                res.status(200).json({ job })
            }
            
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
            const jobs = await Job.find({}).sort({createdAt: 'desc'}) 

            if(jobs.length > 0 ){
                res.status(200).json({
                    jobs
                })   
            }               

        }catch(error){
            res.status(500).json({
                message:"There has been an error fetching the data",
                error
            })
        }
    },

}