import validator from "validator";
import bycrpt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { useId } from "react";
import { v2 as cloundinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    console.log(email, name, password);
    if (!email || !name || !password) {
      res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Please Enter valid email" });
    }

    if (password.length < 8) {
      res.json({ success: false, message: "Please Enter strong password" });
    }

    // hash the password
    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(password, salt);

    const userData = {
      email,
      name,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, message: "User Registration Successful" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Details Missing" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does't exits" });
    }

    const isMatch = await bycrpt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, message: "Login Successful" });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const { userId } = req;
    const userData = await userModel
      .findOne({ _id: userId })
      .select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId } = req;
    const { phone, address, gender, dob, name } = req.body;

    const imageFile = req.file;

    if (!phone || !name || !dob || !gender) {
      console.log(phone);
      console.log(name);
      console.log(dob);
      console.log(gender);
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      gender,
      dob,
      address: JSON.parse(address),
    });
    // todo : the frontend is reciving the address as a string not object

    if (imageFile) {
      const imageUpload = await cloundinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const { docId, slotTime, slotDate } = req.body;

    // get docData
    const docData = await doctorModel.findById(docId).select("-password");

    // check if doctor is available
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not Available" });
    }

    // check for slot availablity
    let slots_booked = docData.slots_booked;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // delete old slots_data
    delete docData.slots_booked;

    // get userData
    const userData = await userModel.findById(userId).select("-password");

    // make an apointment
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getAppointmentsList = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId)
      return res.json({ success: false, message: "Login to get Appointments" });
    const appointmentData = await appointmentModel
      .find({ userId })
      .sort({ date: -1 });

    res.json({ success: true, appointmentData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { userId } = req;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // check if userid of the same as of appointment
    if (appointmentData.userId !== userId) {
      return res.json({
        success: flse,
        message: "You are not Authorized to Cancel this Appointment",
      });
    }

    // release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);
    let slots_booked = docData.slots_booked;

    // remove the slotTime from slots_booked[slotDate] array
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserData,
  updateProfile,
  bookAppointment,
  getAppointmentsList,
  cancelAppointment,
};
