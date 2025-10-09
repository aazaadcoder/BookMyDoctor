import { Router } from "express";
import { cancelAppointment, completeAppointment, getAppointments, getDashboardData, getDoctorList, getDoctorProfile, loginDoctor, updateDoctorProfile } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = Router();

doctorRouter.get('/list', getDoctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoctor,  getAppointments);
doctorRouter.post('/appointment-cancel', authDoctor,  cancelAppointment);
doctorRouter.post('/appointment-complete', authDoctor,  completeAppointment);
doctorRouter.get('/dashboard-data', authDoctor,  getDashboardData);
doctorRouter.get('/profile', authDoctor,  getDoctorProfile);
doctorRouter.post('/update-profile', authDoctor,  updateDoctorProfile);


export default doctorRouter;