const express = require ('express');
const { createCourse, deleteCourse, modifyCourse, getPhoto, readCourse, courseById, getCourses } = require('../controllers/courseCtrl');
const Courses = require ('../models/course')

const courseRouter = express.Router();

courseRouter.get('/', getCourses)

// create a course
// courseRouter.post('/:courseId/', createCourse )

// testing route from frontend
courseRouter.post('/', createCourse )

courseRouter.get('/photo/:courseId', getPhoto )


// edit a course
courseRouter.patch('/:courseId/modify', modifyCourse )


// remove a course entirely
courseRouter.delete('/:courseId', deleteCourse)





courseRouter.get('/:courseId', readCourse)




courseRouter.put('/:courseId', (req, res) => {
    
})


courseRouter.delete('/:courseId', (req, res) => {
    
})

// any route with :courseId, use the courseById middleware
courseRouter.param('courseId', courseById)

module.exports = courseRouter