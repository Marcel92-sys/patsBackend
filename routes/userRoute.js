const express = require ('express');
const Pat_Users = require('../models/user');
const { generateAccessToken, registerUser, signInUser, buyCourse } = require('../controllers/user');
const Courses = require('../models/course');

const userRouter = express.Router();


userRouter.post('/register', registerUser)


userRouter.post('/login', signInUser )

userRouter.get('/', async(req,res) => {
    const users = await Pat_Users.find()
    // ensure to remove the password before hosting

    res.send(users)

})







userRouter.get('/:id', (req,res) => {
    
})


userRouter.patch('/:id', (req,res) => {
    
})

userRouter.patch('/:id/course/:courseId', buyCourse)

// delete account
userRouter.delete('/:id', (req,res) => {
    
})

module.exports = userRouter