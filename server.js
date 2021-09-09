const mongoose = require ('mongoose');
const express = require ('express')
const cors = require ('cors')
const dotenv = require ('dotenv');
const courseRouter = require('./routes/courseRoute');
const adminRoute = require('./routes/adminRoute');

dotenv.config();

const app = express();
app.use(cors({origin: "http://localhost:3000",
            credentials: true }));

const userRouter = require('./routes/userRoute');

// middlewares
app.use(express.json({}));
app.use(express.urlencoded({extended: true}))


// db

const URI = process.env.mongoDB


mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true, 
    useFindAndModify:false,
    useUnifiedTopology: true})
    
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:') )



// routes

app.use('/v1/courses', courseRouter)
app.use('/v1/users', userRouter)
app.use('/v1/admin', adminRoute)

app.get('*', (req, res) => {
    res.send("Path does not exist!")
})

// auth express-jwt error handling

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({'error': err.name + ": " + err.message})
    } else if (err) {
        res.status(400).json({"error": err.name + ": " + err.message})
        console.log(err)
    }
})


const port = 6800;

app.listen(port, () => console.log(`Server started on http://localhost:${port}`))

