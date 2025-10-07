import express from 'express'

import upload from '../middlewares/multer.js'
import {addDoctor,cancelAppointment,getAllAppointments,getAllDoctors,loginAdmin } from '../controllers/adminController.js';
import { authAdmin } from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';


const adminRouter = express.Router();


adminRouter.post('/add-doctor',authAdmin,  upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/all-doctors', authAdmin, getAllDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/appointment-list', authAdmin, getAllAppointments);
adminRouter.post('/appointment-cancel', authAdmin, cancelAppointment);



export default adminRouter;