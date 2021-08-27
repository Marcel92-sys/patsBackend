const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String},
    phoneNumber: {type: String, unique:true},
    email: {type: String},
    password: {type: String, required: true},
    courses:[{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]

})

const Pat_Users = mongoose.model("Pat_Users", userSchema)

module.exports = Pat_Users;