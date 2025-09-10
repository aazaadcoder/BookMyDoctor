import { Router } from "express";
import { getDoctorList } from "../controllers/doctorController.js";

const doctorRouter = Router();

doctorRouter.get('/list', getDoctorList);


export default doctorRouter;