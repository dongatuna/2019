const mongoose = require('mongoose')
const User = require("../models/user")
const JWT = require('jsonwebtoken')
const { JWT_SECRET, ISSUER } = require('../helpers/config')

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

    signUp: async(req, res, next) => {
        try{
            //get the data
            const {email, password } = req.body
            //make sure that the user doesn't exist in db
            const result =  await User.findOne({email})

            console.log("Is this the result...", result)
            //if user does, let admin to login
            if(result){
                return res.status(404).json({
                    message: "The email is in use"
                })
            }

            const user = new User({     
                email, 
                password
            })
           
            await user.save()

            const token = signToken(user)
            //Send a cookie containing JWT
            res.cookie("user_token", token , {/*secure: true,*/  httpOnly:true})
            res.status(200).json({success: true, role: user.role})
            

        }catch(error){
            res.status(404).json({
                message: 'There was an error signing up',
                error
            })
        }
    },

    signIn: async(req, res, next) => {
        try{    
            //get the user from passport local method
            const user = req.user

            console.log("This is the user ", user)
            const token = signToken(user)

            res.cookie('user_token', token, {httpOnly:true})

            res.status(200).json({ success: true, role: user.role })

        }catch(error){
            res.status(404).json({
                message:'There was an error signing in or logging in',
                error
            })
        }
    },

    checkAuth: async(req, res, next ) => {
        try{
            res.status(200).json({success: true})
        }catch(err){
            console.log("This is the error", err)
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