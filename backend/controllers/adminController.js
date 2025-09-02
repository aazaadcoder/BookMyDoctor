import validator from 'validator';
import bycrpt from 'bcrypt';
import {v2 as cloudinary} from  'cloudinary';
import doctorModel from '../models/doctorModel.js'
// controller to add doctor by admin 
const addDoctor = async (req, res) => {
    try {
        const {name, email, password, speciality, degree, address, experience, about, fees} = req.body;
        const imageFile = req.file;

        // cheching if all data present
        if(!name || !email || !password || !speciality || !degree || !address || !experience || !about || !fees ){
            return res.json({
                success : false,
                message : "Missing Details",
            })
        }
        

        // validate email format
        if(!validator.isEmail(email)){
            return res.json({
                success : false,
                message : "Enter a vaild email",
            })
        }

        // validate strong password
        if(password.length  < 8 ){
            return res.json({
                success : false,
                message : "Enter a strong password",
            })
        }

        // hash the password

        const salt = await bycrpt.genSalt(10);
        const hashedPassword = await bycrpt.hash(password , salt);


        // upload image to cloudinary 
        const imageUpload = await cloudinary.uploader(imageFile.path, {resource_type : "image"});
        const imageUrl = imageUpload.secure_url;


        const doctorData = {
            name, 
            email, 
            image : imageUrl,
            password : hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address : JSON.parse(address),
            date : Date.now(),
        }


        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success : true, message : "doctor added"});

        

    } catch (error) {
        console.log(error);
        res.json({success : false , message : error.message});
    }
}

export default addDoctor;