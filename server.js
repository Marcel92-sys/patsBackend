const mongoose = require ('mongoose');
const express = require ('express')
const cors = require ('cors')
const dotenv = require ('dotenv');
const userRouter = require('./routes/userRoute');
const courseRouter = require('./routes/courseRoute');
const adminRoute = require('./routes/adminRoute');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}))


// routes

app.use('/v1/courses', courseRouter)
app.use('/v1/users', userRouter)
app.use('/v1/admin', adminRoute)
// const secret =  require('crypto').randomBytes(64).toString('hex')
// console.log(secret)

app.get('*', (req, res) => {
    res.send("Path does not exist!")
})
// db
const URI = process.env.mongoDB


mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true})
    
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:') )


const port = 6800;

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))

