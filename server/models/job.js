const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true} ,
    title: {type:String, required: true},
    description: {type:String, required: true},
    requirements: {type:String, required: true},
    location: {type: String, required: true},
    fileattachments: [String]
})

module.exports = mongoose.model("Job", jobSchema);