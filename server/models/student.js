const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    address: {type: String },
    city: {type: String},
    zip: {type: String},
    state: {type: String, default: "WA"},
    email: {type: String, lowercase: true, unique: true, dropDups: true, index: true, required: true},
    tel: {type: String, required: true},
    first: {type: String, required: true},
    last: {type: String, required: true},        
    contacted : {type: Boolean, default: false},
    birthdate: {type: Date},
    createdAt: {type: Date, default: Date.now},
    //payments should be an array
    payments: [
        {
            amount: {type: Number }, 
            course_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
            //mode: {type: String, enum:['Cash','Card', 'Check/Money Order']},
            //"received by":{type: String, enum:['dongatuna', 'ngigiwagatuna', 'tacomaadmin', 'desmoinesadmin']},
            date: {type: Date, default: Date.now}                  
        }
    ],
    notes: {type: String, default: ""},
    registered: {type: Boolean, default: false} 
})

module.exports = mongoose.model("Student", studentSchema )