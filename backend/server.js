import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser';
// server config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();




app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());


// api endpoints

app.use('/api/admin' , adminRouter);
app.use('/api/doctor' , doctorRouter);
app.use('/api/user' , userRouter);

app.get('/', (req, res) => {
    res.send("API WORKING");
})


app.listen(PORT, () => {
    console.log("Server Started at: PORT: ", PORT);
})