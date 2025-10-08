import { Router } from "express";
import { getAppointments, getDoctorList, loginDoctor } from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = Router();

doctorRouter.get('/list', getDoctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoctor,  getAppointments);


export default doctorRouter;