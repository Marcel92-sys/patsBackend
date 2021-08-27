const jwt = require ('express-jwt');
const Pat_Users = require('../models/user');
const bcrypt = require ('bcryptjs');


const salt = bcrypt.genSaltSync(10);

const generateAccessToken = (phoneNumber) => {
    return jwt.toString(phoneNumber, process.env.TOKEN_SECRET, {expiresIn: '1830s'});
}



const registerUser =  async(req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    
    const reqUser = req.body;
    try {
        const existingUser = await Pat_Users.findOne({phoneNumber: reqUser.phoneNumber})
        console.log(existingUser);
        if(existingUser) {
            res.send(`A user already exists with this phone number ${reqUser.phoneNumber}, so it can't be used again.`)
        } else{

            const newUser = new Pat_Users(reqUser);
           newUser.save();
            // console.log( newUser)
    
        res.send(`${newUser.name}, your account has been successfully created.`)
        }

        // await Deposit.deleteMany({});


    } catch (error) {
    console.log(error)
    }

    
}


const signInUser = async(req,res) => {
    

    const user = await Pat_Users.findOne({$or: [{'email': req.body.email},{'phoneNumber': req.body.phoneNumber}]})
    if(!user) {
        res.send("No User with this account details found, please sign up.")
    } else{
            const verifiedPassword = bcrypt.compareSync(req.body.password, user.password)
            if(!verifiedPassword){
                res.send("The password does not match this account, try again.")
            } else{
                    console.log("here now")
                const token = generateAccessToken({phoneNumber: req.body.phoneNumber})
                res.json(token)
            }

    }


}


const buyCourse =  async(req, res) => {

    // get course, add user to the sunscribers

    try {
        const result = await Courses.findByIdAndUpdate(req.params.courseId, 
                        {$push: {'subscribers': {candidate: req.params.id, seatsTaken: req.body.quantity}},
                             $inc: {students: req.body.quantity}
                        }, {new: true})
        console.log(result)
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err)
    }

}
module.exports = {generateAccessToken,signInUser,buyCourse, registerUser}
