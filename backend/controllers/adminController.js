import validator from "validator";
import bycrpt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// controller to add doctor by admin  // need to be tested
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      address,
      experience,
      about,
      fees,
    } = req.body;

    const imageFile = req.file;

    // cheching if all data present
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !address ||
      !experience ||
      !about ||
      !fees
    ) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a vaild email",
      });
    }

    // validate strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a strong password",
      });
    }

    // hash the password

    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "doctor added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      // generate jwt secret

      const token = jwt.sign(email + password, process.env.JWT_SECRET);

      //send the token
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Envalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// to get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get all appointments list
const getAllAppointments = async (req, res) => {
  try {
    const appointmentData = await appointmentModel.find({});
    res.json({ success: true, appointmentData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addDoctor, loginAdmin, getAllDoctors, getAllAppointments };
