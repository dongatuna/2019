const mongoose = require('mongoose')
const User = require("../models/user")
const JWT = require('jsonwebtoken')
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
            //create a token
           // const buf = await crypto.randomBytes(128)

            const token = await crypto.randomBytes(128).toString('hex')

            console.log("Here is the token: ", token)

            const user = await User.findOne({email: req.body.email})

            if(!user){
                return res.status(404).json({
                    message: "The user does not exist",
                    url: '/forgot'
                })
            }

            user.resetPasswordToken = token
            user.resetPasswordExpires = Date.now() + 3600000 // 1 hour

            await user.save()

            var msg = {
                to: user.email,
                from: 'jobs.at.excel@gmail.com',
                subject: 'Excel Health Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                  'http://localhost:8080/reset/' + token + '\n\n' +
                  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            }

            console.log('What is the value here? ', sgMail.send(msg))

            res.status(200).json({
                message: "Please check your email for instructions on how to reset the password."
            })


        }catch(err){
            res.status(500).json({
                message: 'There has been an error resetting your password',
                error: err,
                url: "/forgot"
            })
        }
    },

    // reset: async(req, res, next) => {
    //     //does the user exist using the retrieved token and at this time - token expires?
    //     const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })

    //     if(!user){
    //         return res.status(404).json({
    //             message: "Password reset token is invalid or has expired",
    //             url: '/forgot'
    //         })        
    //     }

    //     res.status(200).json({
    //         message: "Enter new password",
    //         url: "/reset"
    //     })
    // },

    reset: async (req, res, next ) => {
        //does the user exist?
        const user = await User.findOne({resetPasswordToken: req.params.token, confirmed: true, resetPasswordExpires:{ $gt: Date.now() }})

        if(!user){
            return res.status(404).json({
                message: "Password reset token is invalid or has expired",
                url: '/forgot'
            })        
        }

        const {password, password2} = req.body

        if(password === password2){
            
            user.resetPasswordToken = undefined
            user.resetPasswordExpires = undefined
        }else{
            return res.status(401).json({
                message: "Your password and confirm password do not match.",
                url: "/forgot"
            })
        }

        await user.save()

        var msg = {
            to: user.email,
            from: 'jobs.at.excel@gmail.com',
            subject: 'Excel Health Password Reset',
            text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        }

        console.log('What is the value here? ', sgMail.send(msg))

        res.status(200).json({
            message: "Please sign in using your email and new password.",
            url: "/signin"
        })


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
                return res.status(404).json({
                    message: "The email is in use."
                })
            }
         
           
            if( password === password2 ){
                
                const user = new User({    
                    email, 
                    password                
                })      
               
                
                user.resetPasswordToken = await crypto.randomBytes(128).toString('hex'),
                user.resetPasswordExpires = Date.now() + 3600000
                console.log("User state1: ", user)
                await user.save()

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

                console.log("I am getting ....here....")
                res.status(200).json({
                    message: 'Check your email for further instruction on how to complete signing up.'               
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

            console.log("We are getting here...")
            //confirm that the token exists and that the token is not expired
            
            const user = await User.findOneAndUpdate({resetPasswordToken: req.params.token, resetPasswordExpires:{ $gt: Date.now() }}, 
                                    {$set:{
                                        confirmed: true,
                                        resetPasswordToken:undefined,
                                        resetPasswordExpires:undefined
                                    }}, 
                                    
                                    {new: true}
                        )
            
            console.log("Here is the updated user", user)                        
            if(!user){
                return res.status(404).json({
                    message: "Ooops!  Took too long to confirm your email, please sign up again.",
                    url: '/forgot'
                })        
            }           

            const token = signToken(user)
            //Send a cookie containing JWT
            res.cookie("user_token", token , {/*secure: true,*/  httpOnly:true})

            const results = {
                confirmed: user.confirmed,
                username: user.email.split("@")[0],
                role: user.role
            }

            res.status(200).json({results})          

        }catch(err){

        }
    },

    signIn: async(req, res, next) => {
        try{    
            //get the user from passport local method
            const user = req.user
            //console.log("Is this is a user ", req.user)

            if(!user.confirmed){
                return res.status(400).json({
                    message: "You account has not yet been authenticated.  ",
                    url: "/forgot"
                })
                
            }  
                      
            const token = signToken(user)
            console.log("Here...is the token ", token)

            res.cookie("user_token", token , {/*secure: true,*/  httpOnly:true})

            const results = {
                confirmed: user.confirmed,
                username: user.email.split("@")[0],
                role: user.role
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