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

// api to cancel a appointment
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.json({ success: false, message: "missing credentials " });
    }
    const { docId } = req;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // check is doctor is same as appointment doctor
    if (docId !== appointmentData.docId) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // release doctor slot
    const { slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);
    let slots_booked = docData.slots_booked;

    // remove the slotTime from slots_booked[slotDate] array
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (item) => item != slotTime
    );

    // update slot in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to mark a appointment complete
const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const { docId } = req;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.json({
        success: false,
        message: "Invaild Request",
      });
    }
    if (appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentData._id, {
        isCompleted: true,
      });
      res.json({ success: true, message: "Appointment Marked Complete" });
    } else {
      res.json({
        success: false,
        message: "Unauthorized Action",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ Success: false, message: error.message });
  }
};

// api to get doctor dashboard data

const getDashboardData = async (req, res) => {
  // get total earning , list of patients , and count of patients
  try {
    const {docId} = req;

    if(!docId){
      return res.json({success : false, message : "Credentials Missing"});
    }
    const appointmentData = await appointmentModel.find({ docId });

    if(!appointmentData){
      return res.json({success : false, message : "Unauthorized Access"});
    }

    let earnings = 0;

    appointmentData.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patient = [];

    appointmentData.map((item) => {
      if(!patient.includes(item.userId)){
        patient.push(item.userId);
      }
    })

    const dashboardData = {
      earnings,
      appointments : appointmentData.length,
      patients : patient.length,
      latestAppointments : appointmentData.reverse(),
    }

    res.json({success : true, dashboardData});
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: error.message });
  }
};

export {
  changeAvailability,
  getDoctorList,
  loginDoctor,
  getAppointments,
  cancelAppointment,
  completeAppointment,
  getDashboardData
};
