const Courses = require("../models/course");

const createCourse = async(req,res) => {
    // console.log(req.body)
    try {
        const result = await new Courses(req.body)
        result.save();
        console.log(result)
        res.status(200).send(`You have successfully added 
                       ${result.title} as a course`)
        
    } catch (error) {
                console.log(error.message)
        res.status(400).send(error)
    }
    
} 


const deleteCourse = async(req, res) => {
    // get course by Id and remove from db
    try {
        const result = await Courses.findByIdAndDelete(req.params.id);
        console.log(result)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

}

const modifyCourse = async(req, res) => {
    console.log(req.params.body)
    try {
       const result = await Courses.findByIdAndUpdate(req.params.id, req.body, {new: true})
    
        console.log(result)
        res.status(200).send(`Successfuly modified`)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = {createCourse, deleteCourse, modifyCourse}