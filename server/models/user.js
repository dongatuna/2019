const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
   // _id: mongoose.Schema.Types.ObjectId, 
    email: {type: String, dropDups: true, unique: true, required:true},
    password: {type: String,  min: 6,  required: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    confirmed: {type: Boolean, default: false},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})

userSchema.pre('save', async function(next){
    try{
      
        //create the salt
        const salt =  await bcrypt.genSalt(10)

        //encrypt the submitted password
        const passwordHash = await bcrypt.hash(this.password, salt)

        console.log("This is password hash ", passwordHash)
        this.password = passwordHash

        if(this.email==='ngatuna05@gmail.com'||this.email==='gatunan@gmail.com'){
            console.log("We should get here...")
            this.role = 'admin',
            this.confirmed = true
        }
        
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