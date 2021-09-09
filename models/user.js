const mongoose = require('mongoose');
const crypto = require ('crypto')

const userSchema = new mongoose.Schema({
    name: {type: String},
    phoneNumber: {type: String, unique:true},
    email: {type: String},
    photo: {
        data:Buffer,
        contentType: String
    },
    hashed_password: {type: String, required: "Password is required"},
    salt: String,
    isAdmin:{ type: Boolean, default: false},
    courses:[{type: mongoose.Schema.Types.ObjectId, ref: "Course"}]
})


userSchema.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
}).get(function() {
    return this._password
})

userSchema.path('hashed_password').validate(function() {
    if (this._password && this._password.length < 7) {
        this.invalidate('password', "Password must be atleast 7 character long.")
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', "Password is compulsorily required.")
    }
}, null)


userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password) {
        if (!password) return ''

        try {
            return crypto.createHmac('sha1', this.salt)
                        .update(password)
                        .digest('hex')
        } catch (err) {
            return ''
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}



const User = mongoose.model("User", userSchema)

module.exports = User;