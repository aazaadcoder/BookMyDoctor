import { Router } from "express";
import { getDoctorList, loginDoctor } from "../controllers/doctorController.js";

const doctorRouter = Router();

doctorRouter.get('/list', getDoctorList);
doctorRouter.post('/login', loginDoctor);


export default doctorRouter;