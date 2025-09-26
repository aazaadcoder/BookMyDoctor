import express from "express";

import { bookAppointment, cancelAppointment, getAppointmentsList, getUserData, loginUser, registerUser, updateProfile } from "../controllers/userController.js";
import { userAuth } from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile-data", userAuth, getUserData);
userRouter.post("/update-profile",upload.single('image'), userAuth, updateProfile);
userRouter.post("/book-appointment", userAuth, bookAppointment);
userRouter.get("/appointments-list", userAuth, getAppointmentsList);
userRouter.delete("/cancel-appointment", userAuth, cancelAppointment);

export default userRouter;
