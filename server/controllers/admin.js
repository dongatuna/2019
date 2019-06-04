const mongoose = require('mongoose')
const Admin = require("../models/admin")
const JWT = require('jsonwebtoken')
const { JWT_SECRET, ISSUER } = require('../helpers/config')

signToken = (user) =>{
    return JWT.sign(        
        {
            iss: ISSUER,
            sub: user.id,
            iat: new Date().getTime(), //current time
            exp: new Date().setDate(new Date().getDate() + 1)            
        },
        JWT_SECRET   
    )
}

module.exports = {

    signUp: async(req, res, next) => {
        try{
            //get the data
            const {username, password } = req.body
            //make sure that the user doesn't exist in db

            username.toLowerCase()

            //console.log(username)

            const result =  await Admin.findOne({username})

            console.log("Is this the result...", result)
            //if user does, let admin to login
            if(result){
                return res.status(404).json({
                    message: "The username is in use"
                })
            }


            //store password and user
            const admin = new Admin({
               // _id: mongoose.Types.ObjectId(),
                username, 
                password
            })

      
            //save the admin
            await admin.save()

            const token = signToken(admin)

            //Send a cookie containing JWT
            res.cookie("access_token", token , {/*secure: true,  */httpOnly:true})
            
            res.status(200).json({success: true})

        }catch(error){
            res.status(404).json({
                message: 'There was an error signing up',
                error
            })
        }
    },

    checkAuth: async(req, res, next) => {
        res.json({success: true})
    },

    signIn: async(req, res, next) => {
        try{    
            //get the user from passport local method
            const admin = req.user

            const token = signToken(admin)

            console.log(admin)

            res.cookie("access_token", token, {httpOnly: true})
            res.status(200).json({ success: true })

        }catch(error){
            res.status(404).json({
                message:'There was an error signing in or logging in',
                error
            })
        }
    },

    logOut: async (req, res, next) => {
        try{

            req.logOut()

            res.status(200).json({
                token: null
            })
        }catch(error){
            res.status(401).json({
                message:  "There has been an error logging out",
                error
            })
        }
    }

}