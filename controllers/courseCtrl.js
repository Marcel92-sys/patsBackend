const formidable = require("formidable");
const fs = require('fs');
const Courses = require("../models/course");


const getCourses = async(req,res) => {
    try {
        const courses = await Courses.find({});
        res.status(200).send(courses)
    } catch (error) {
        console.log(error.message)
        res.status(400).send(error)
    }
}

const buyCourse =  async(req, res, next) => {
    // get course, add user to the sunscribers

    try {
        const result = await Courses.findByIdAndUpdate(req.params.courseId, 
                        {$push: {'subscribers': {candidate: req.params.id, seatsTaken: req.body.quantity}},
                             $inc: {students: req.body.quantity}
                        }, {new: true})
        res.status(200).json({message: `You have successfully paid....Cheers!`})
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err)
    }

}


const createCourse = async(req,res) => {
    let form = formidable()
    form.keepExtensions = true
    form.parse(req, async(err, fields, files) => {
    //     console.log(fields)
        if(err) {
            return res.status(400).json({error:"Photo could not be uploaded"})
        }
        let course = new Courses(fields)
        
        if(files.photo) {
            course.photo.data = fs.readFileSync(files.photo.path)
            course.photo.contentType = files.photo.type
        }
        try {
            const result = await course.save()
            
            res.status(200).send(`You have successfully added 
                           ${result.title} as a course`)
            
        } catch (error) {
            console.log(error.message)
            res.status(400).send(error)
        }
    })

    // let course = req.body;
    // course.createdBy = req.params.id
    
    
} 

const getPhoto = (req, res) => {
    if(req.course.photo.data) {

        res.set("Content-Type", req.course.photo.contentType)
        return res.send(req.course.photo.data)
    } else {
        res.send("No picture found for this course")
    }
    }

const deleteCourse = async(req, res) => {
    // get course by Id and remove from db
    try {
        const result = await Courses.findByIdAndDelete(req.params.courseId);
        console.log(result)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}

const modifyCourse = async(req, res) => {
    console.log(req.params.body)
    try {
       const result = await Courses.findByIdAndUpdate(req.params.courseId, req.body, {new: true})
    
        console.log(result)
        res.status(200).send(`Successfuly modified`)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}



const courseById = async(req, res, next) => {
    const id = req.params.courseId;
    try {
        const course = await  Courses.findById(id);
        if (!course) {
            return res.status(400).json({error: "Course not found"})
        }
        req.course = course;
        next()
    } catch (e) {       
        console.log(e.message)
       return res.status(400).send(e)
    }
}

const readCourse = (req, res) => {
    req.course.photo = undefined
   return res.json(req.course)
}

module.exports = {createCourse,readCourse,courseById,buyCourse,getCourses, deleteCourse, modifyCourse, getPhoto}