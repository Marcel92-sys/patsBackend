const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {type: String , unique:true},
    description: {type: String},
    fee: {type: Number},
    duration: {type: String},
    photo: {
        data: Buffer,
        contentType: String},
    createdBy:  {type: mongoose.Schema.Types.ObjectId, ref:'Users'},
                    
    subscribers: [{
                    candidate: {type: mongoose.Schema.Types.ObjectId, ref:'Users'},
                    seatsTaken: {type: Number, default: 1},
                    payDate: {type:Date, default: Date.now}
                 }],
    
    studentsAmount: {types:Number}
    
})

const Courses = mongoose.model("Courses", courseSchema)

module.exports = Courses;