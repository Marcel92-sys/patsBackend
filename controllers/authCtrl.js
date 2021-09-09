const expressJwt = require("express-jwt")
const User = require("../models/user")
const jwt = require('jsonwebtoken')

const signIn = async(req, res) => {
    try {
            let user = await User.findOne({"phoneNumber": req.body.phoneNumber})

            if (!user) return res.status('401').json({error: "Account does not exist, do create an account."})
            
            

            if (!user.authenticate(req.body.password)) {
                return res.status('401').send({error: "Email and password don't match."})
            }

            const token = jwt.sign({_id: user._id}, process.env.JWW_SECRET)

            res.cookie('t', token, {expire: new Date() + 9999 })

            return res.json({
                token, 
                user: {
                    _id: user._id,
                    name: user.name,
                    isAdmin: user.isAdmin,
                    phoneNumber: user.phoneNumber
                }
            })

    } catch(err) {
        return res.status('401').json({error: "Could not sign in."})
    }
} 

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({message: "signed out"})
}

const requireSignin = expressJwt({
    secret: process.env.JWW_SECRET,
    userProperty: 'auth',
    algorithms: ['HS256']
})


const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!authorized) {
        return res.status('403').json({
            error: 'User is not authorized'
        })
    }
    next()
}

module.exports = {hasAuthorization, requireSignin, signout, signIn}
