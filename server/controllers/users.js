const mongoose = require('mongoose')
const User = require("../models/user")
const JWT = require('jsonwebtoken')
const moment = require('moment')
const crypto = require("crypto")
const { JWT_SECRET, ISSUER,  EmailAPI } = require('../helpers/config')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(EmailAPI)

signToken = (user) =>{
    return JWT.sign(        
        {
            iss: ISSUER,
            sub: user.id,
            iat: new Date().getTime(), //current time
            expiresIn: "1h", //current time + 1 day ahead
          
        },
        JWT_SECRET   
    )
}

module.exports = {

    checkAuth: async(req, res, next ) => {
        try{
            res.status(200).json({success: true})
        }catch(err){
            console.log("This is the error", err)
        }
    },

    forgot: async( req, res, next ) => {
        try{
            //console.log(req.body.email)

            const user = await User.findOne({email: req.body.email})

            const token = await crypto.randomBytes(128).toString('hex')

            if(!user){
                return res.status(404).json({
                    message: "The user does not exist.",
                    checkEmail: false
                })
            }

            user.resetPasswordToken = token
            user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

            await user.save()

            const msg = {
                to: user.email,
                from: 'jobs.at.excel@gmail.com',
                subject: 'Excel Health Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://localhost:8080/reset/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }

            sgMail.send(msg)

            res.status(200).json({
                message: "Please check your email for instructions on how to reset the password.",
                checkEmail: true
            })


        }catch(err){
            res.status(500).json({
                message: 'There has been an error resetting your password',
                error: err,
                url: "/forgot"
            })
        }
    },

     //This user is confirmed
    reset: async (req, res, next ) => {
        //does the user have a reset token that is not currently expired?
        const user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires:{ $gt: Date.now() }})

        console.log("Here is the user...", user)
        //return if the user does not have a 
        if(!user){
            return res.status(200).json({
                message: "Password reset token is invalid or has expired.  Click on localhost:8080/forgot to reset password afresh.",
                checkEmail: false               
            })        
        }

        const { password, password2 } = req.body

        if( password === password2 ){

            user.password = password
            user.confirmed = true                                      
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
           
            await user.save()

            const msg = {
                to: user.email,
                from: 'jobs.at.excel@gmail.com',
                subject: 'Password Reset Successful',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            }
    
            sgMail.send(msg)

                const results = {
                confirmed: user.confirmed,
                username: user.email.split("@")[0],
                role: user.role
            } 
            
            // const token = signToken(reset_user)
            const token = signToken(user)
            //Send a cookie containing JWT
            res.cookie("user_token", token , {/*secure: true,*/  httpOnly:true})

            res.status(200).json({ results })
        } else {
            return res.status(200).json({
                message: "Your password and confirm password do not match.",
                checkEmail: false
            })
        }
    },

    signUp: async(req, res, next) => {
        try{
            //get the data
            console.log("This is the req body ", req.body)
            const { email, password, password2 } = req.body
           
            //make sure that the user doesn't exist in db
            const result =  await User.findOne({ email })

            //if user does, let admin to login
            if(result){
                return res.status(200).json({
                    message: "The email is in use.",
                    checkEmail: false
                })
            }

            console.log('We are getting here #1')

            const adminEmails = ['ngatuna05@gmail.com', 'gatunan@gmail.com']
         
            if(!adminEmails.includes(email)){
                if( password === password2 ){          
                    
                    const user = new User({    
                        email, 
                        password                
                    })

                    console.log('We are getting here #2')

                    user.resetPasswordToken = await crypto.randomBytes(128).toString('hex'),
                    user.resetPasswordExpires = Date.now() + 3600000

                    console.log('We are getting user', user)

                    await user.save() 

                    console.log('We are getting here #3')

                    //send an email to user token 
                    var msg = {
                        to: user.email,
                        from: 'jobs.at.excel@gmail.com',
                        subject: 'Confirm your email',
                        text: 'Please confirm your email, by clicking on the following link, or pasting it on your browser to complete the process:\n\n' +
                          'http://localhost:8080/confirm/' + user.resetPasswordToken + '\n\n' +
                          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                    }
   
                    sgMail.send(msg)    
    
                    return res.status(200).json({
                        message: 'Log into your email to complete signing up.',
                        checkEmail: true               
                    })                
                }  
            }  else {

                console.log("Here is someone trying to log in as admin")
                res.status(200).json({
                    message: "Not to be used by administrators to log in.",
                    checkEmail: false               
                })                
            }                 
        }catch(error){
            res.status(404).json({
                message: 'There was an error signing up',
                error
            })
        }
    },

    addUser: async( req, res, next ) => {
        try{
            console.log('I am getting here...')

            
            const user = await User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires:{ $gt: Date.now() }})

            if(!user){
                return res.status(200).json({
                    message: "Ooops!  Took too long to confirm your email, please click forgot password on the sign in page.",
                    checkEmail: false
                })        
            }    
            
            console.log('This is the user ', user)
            user.confirmed = true
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined

            await user.save()

            const token = signToken(user)
            console.log('This is the user....after successfull sign up', user)
            //Send a cookie containing JWT
            res.cookie("user_token", token , {/*secure: true,*/  httpOnly:true})

            const results = {
                confirmed: user.confirmed,
                username: user.email.split("@")[0],
                role: user.role,
                _id: user._id
            }

            console.log('These are the results to be returned....', results)

            res.status(200).json({results})          

        }catch(err){
            res.status(500).json({
                message: "There has been an error adding your account.",
                err
            })
        }
    },

    signIn: async(req, res, next) => {
        try{    
            //get the user from passport local method
           
            const user = req.user
            console.log("This is the user: ", user)

                
            if(!user.confirmed){     
                // user.resetPasswordExpires = undefined
                // user.resetPasswordToken = undefined                

                // console.log("This is the user #1: ", user)
                // user.resetPasswordExpires = Date.now() + 3600000
                // user.resetPasswordToken = await crypto.randomBytes(128).toString('hex') 

                console.log("This is the user #2: ", user)
                 //send an email to user with a token 
                const msg = {
                    to: user.email,
                    from: 'jobs.at.excel@gmail.com',
                    subject: 'Confirm your email',
                    text: 'Please confirm your email, by clicking on the following link, or pasting it on your browser to complete the process:\n\n' +
                      'http://localhost:8080/confirm/' + user.resetPasswordToken + '\n\n' +
                      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                }

                sgMail.send(msg)    

                return res.status(200).json({
                    message: 'You never confirmed your account by logging into your email and finishing the sign up process.  Check your email to complete the sign up process.',    
                    checkEmail: true          
                }) 
            }    
                      
            const token = signToken(user)
            console.log("Here...is the token ", token)

            res.cookie("user_token", token , {/*secure: true,*/  httpOnly:true})

            const results = {
                confirmed: user.confirmed,
                username: user.email.split("@")[0],
                role: user.role,
                _id: user._id
            }

            res.status(200).json({ results})

        }catch(error){
            res.status(404).json({
                message:'There was an error signing in or logging in',
                error
            })
        }
    },   

    signOut: async (req, res, next) => {
        try{
            
            res.clearCookie('user_token', {httpOnly:true})
           
            res.status(200).json({success: true})
        }catch(error){
            res.status(401).json({
                message:  "There has been an error logging out",
                error
            })
        }
    }
}