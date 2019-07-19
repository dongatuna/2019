const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId, 
    email: {type: String, dropDups: true, required:true},
    password: {type: String,  min: 6,  required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    confirmed: {type: Boolean, default: false},
    resetPasswordToken: {type: String, default: null},
    resetPasswordExpires: {type: Date, default: null},
    customerId: {type: String, default: null},
})

userSchema.pre('save', async function(next){
    try{
        
        // the user schema is instantiated
        const user = this

         //check if the user has been modified to know if the password has already been hashed
        if(!user.isModified('password')){
            next()
        }
        //create the salt
        const salt =  await bcrypt.genSalt(10)

        //encrypt the submitted password
        const passwordHash = await bcrypt.hash(this.password, salt)

        this.password = passwordHash       
        
        next()
    }catch(error){
        next(error)
    }
})

//this method is used to verify the password of the user
userSchema.methods.isValidPassword = async function (newPassword) {
    try {

        return await bcrypt.compare(newPassword, this.password)

    } catch (error) {
      throw new Error(error)
    }
}

module.exports = mongoose.model('User', userSchema)