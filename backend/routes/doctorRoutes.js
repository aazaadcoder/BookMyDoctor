import { Router } from "express";
import { cancelAppointment, completeAppointment, getAppointments, getDoctorList, loginDoctor } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = Router();

doctorRouter.get('/list', getDoctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoctor,  getAppointments);
doctorRouter.post('/appointment-cancel', authDoctor,  cancelAppointment);
doctorRouter.post('/appointment-complete', authDoctor,  completeAppointment);


export default doctorRouter;