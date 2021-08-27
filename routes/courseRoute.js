const express = require ('express')
const Courses = require ('../models/course')

const courseRouter = express.Router();

courseRouter.get('/', async(req,res) => {
    try {
        
        const courses = await Courses.find({});
        console.log(courses)
        res.status(200).send(courses)
        
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error)
    }
})


courseRouter.get('/courses/:id', (req, res) => {
    const id = req.params.id;

    const course = Courses.findById(id);
    console.log(course)
    
})


courseRouter.patch('/courses/:id', (req, res) => {
    
})


courseRouter.put('/courses/:id', (req, res) => {
    
})


courseRouter.delete('/courses/:id', (req, res) => {
    
})

module.exports = courseRouter