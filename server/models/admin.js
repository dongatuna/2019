const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId, 
    username: {type: String, enum: ['dongatuna', 'ngigiwagatuna'], unique: true, required:true},
    password: {type: String,  min: 6,  required: true}
})

adminSchema.pre('save', async function(next){
    try{
        console.log(`Before bycrypt`)
        //create the salt
        const salt =  await bcrypt.genSalt(10)

        //encrypt the submitted password
        const passwordHash = await bcrypt.hash(this.password, salt)

        this.password = passwordHash

        console.log("encrypted password", this.password)

        next()
    }catch(error){
        next(error)
    }
})

//this method is used to verify the password of the admin
adminSchema.methods.validPassword = async function(newPassword) {
    try{
        //encrypt and compare the saved password to the newly submitted password
        return await bcrypt.compare(newPassword, this.password)
    }catch(error){
        throw new Error(error)
    }
} 

module.exports = mongoose.model('Admin', adminSchema)