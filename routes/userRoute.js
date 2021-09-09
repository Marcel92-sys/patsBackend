const express = require ('express');
const {  registerUser,  listUsers, readuser, userById} = require('../controllers/userCtrl');
const Courses = require('../models/course');
const { buyCourse, courseById } = require('../controllers/courseCtrl');
const { signIn, requireSignin, hasAuthorization } = require('../controllers/authCtrl');

const userRouter = express.Router();


userRouter.post('/register', registerUser)


userRouter.post('/login',  signIn)

userRouter.get('/', listUsers)

userRouter.route('/:userId')
        .get(requireSignin,readuser)
        .put(requireSignin, hasAuthorization,)
        .delete(requireSignin, hasAuthorization,)

userRouter.patch('/:userId/courses/:courseId', buyCourse)

userRouter.param('userId', userById)

userRouter.param('courseId',  courseById)
module.exports = userRouter