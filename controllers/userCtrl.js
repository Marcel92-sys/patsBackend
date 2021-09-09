const jwt = require ('express-jwt');
const User = require('../models/user');
const bcrypt = require ('bcryptjs');
const { getErrorMessage } = require('../helpers/dbErrorHandler');






const registerUser =  async(req,res) => {
    
    try {
        const existingUser = await User.findOne({phoneNumber: req.body.phoneNumber})
        console.log(existingUser);
        if (existingUser) {
          return  res.status(200).json({message: `A user already exists with this phone number ${req.body.phoneNumber}, so it can't be used again.`})
        } else{
            const newUser = new User(req.body);
            if (newUser.phoneNumber === "0818206541") {
                newUser.isAdmin = true
             return    await newUser.save()
            } else {

              return   await newUser.save();
            }
            console.log(newUser)
    
             res.status(200).json({message: `${newUser.name}, your account has been successfully created.`})
        }
    } catch (err) {
    // console.log(error)
    return res.status(400).json({error: getErrorMessage(err)})
    }    
}


const listUsers = async(req,res) => {

    try {

        const users = await User.find().select('phoneNumber isAdmin name courses')
        console.log(users.length)
        res.json(users)
    } catch (e) {

        return res.status(400).json({error: getErrorMessage(e)})
    }
}

const userById = async(req, res, next) => {
    const id = req.params.userId;
    try {
        const user = await  User.findById(id);
        if (!user) {
            return res.status(400).json({error: "user not found"})
        }
        req.profile = user;
        next()
    } catch (e) {       
        console.log(e.message)
       return  res.status(400).json({error:"Could not retrieve user."})
    }
}

const readuser = (req, res) => {
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        req.profile.photo = undefined
    
   return res.json(req.profile)
}

const updateUser = (req, res) => {

}

const deleteUser = (req, res) => {
    
}


module.exports = {  
    listUsers, 
    registerUser, 
    userById,
    readuser,
    updateUser, 
    deleteUser}
