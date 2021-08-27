const express = require ('express');
const { createCourse, deleteCourse, modifyCourse } = require('../controllers/admin');
const Courses = require('../models/course');

const adminRoute = express.Router();

// create a course
adminRoute.post('/courses/', createCourse )


// edit a course
adminRoute.patch('/courses/:id/modify', modifyCourse )


// remove a course entirely
adminRoute.delete('/courses/:id', deleteCourse)





module.exports = adminRoute