import doctorModel from "../models/doctorModel.js";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.json({ success: true, message: "Avaiability Status Changed" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error in changing the availability status",
    });
  }
};

const getDoctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Credentials Missing" });
    }

    const doctorData = await doctorModel.findOne({ email });

    if (!doctorData) {
      return res.json({ success: false, message: "Invalid Credientials" });
    }

    const isMatch = await bycrpt.compare(password, doctorData.password);

    if (isMatch) {
      const token = await jwt.sign(
        { id: doctorData._id },
        process.env.JWT_SECRET
      );
      res.json({ success: true, token, message: "Login Successful" });
    } else {
      res.json({ success: false, message: "Invalid Credientials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get all appointments of the doctor
const getAppointments = async (req, res) => {
  try {
    const { docId } = req;
    const docData = await doctorModel.findById(docId);

    if (!docData) {
      return res.json({ success: false, message: "Invaild Credentials" });
    }

    // get all appointments
    const appointmentData = await appointmentModel.find({ docId });

    res.json({ success: true, appointmentData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { changeAvailability, getDoctorList, loginDoctor, getAppointments };
