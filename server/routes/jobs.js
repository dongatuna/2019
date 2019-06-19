const express = require("express")
const router = require("express-promise-router")()
const JobController = require("../controllers/jobs")
const passport = require('passport')
const passportConf = require('../passport')
const passportJWT = passport.authenticate('jwt', { session: false })
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/jobs/")
    },

    filename: function(req, file, cb){
       // console.log("Please work....", req.body.userId);
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
      //  cb(null, new Date().toISOString().replace(/:/g, '-') +'/'+ file.originalname  +'/'+ req.user._id +'/'+ req.body.title)
    }
})

const fileFilter = (req, file, cb)=>{

    const acceptedFormats = ['application/msword', 'application/x-mswrite', 
    'text/plain', 'application/pdf', 'image/jpeg', 'image/png' ]
    /*accepted formats:
        - Microsoft Word, Microsoft Wordpad
        - Text File
        - Adobe Portable Document Format
        - Image
    */

    const format = acceptedFormats.includes(file.mimetype);

    //debugger
    if(format){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage,
    limits: {fileSize: 1000000000},
    fileFilter,
    
})


//create a post
//user needs to be authenticated
router.route('/').post(passportJWT, upload.array('fileattachments'), JobController.postJob)

//read many event
router.route('/').get(JobController.allJobs)

//update a post
//user needs to be authenticated
router.route('/:id').patch(passportJWT, upload.array('fileattachements'),  JobController.updateJob)

//read posts by a single user
router.route('/:id').get(JobController.jobsByUser)
//delete a post
//user needs to be authenticated
router.route('/:id').delete(passportJWT, JobController.deleteJob)

//read a single post
router.route('/read/:id').get(JobController.readJobById)

module.exports = router