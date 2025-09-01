import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// server config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();


// middelwares
app.use(express.json());
app.use(cors());


// api endpoints

app.get('/', (req, res) => {
    res.send("API WORKING");
})


app.listen(PORT, () => {
    console.log("Server Started at: PORT: ", PORT);
})