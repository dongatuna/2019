const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId, 
    email: {type: String, dropDups: true, unique: true, required:true},
    password: {type: String,  min: 6,  required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'}
})

userSchema.pre('save', async function(next){
    try{
        console.log(`Before bycrypt`)
        //create the salt
        const salt =  await bcrypt.genSalt(10)

        //encrypt the submitted password
        const passwordHash = await bcrypt.hash(this.password, salt)

        this.password = passwordHash

        if(this.email==='ngatuna05@gmail.com'||this.email==='gatunan@gmail.com'){
            console.log("We should get here...")
            this.role = 'admin'
        }else {
            this.role = 'user'
        }
        next()
    }catch(error){
        next(error)
    }
})

//this method is used to verify the password of the admin
userSchema.methods.validPassword = async function(newPassword) {
    try{
        //encrypt and compare the saved password to the newly submitted password
        return await bcrypt.compare(newPassword, this.password)
    }catch(error){
        throw new Error(error)
    }
} 

module.exports = mongoose.model('User', userSchema)