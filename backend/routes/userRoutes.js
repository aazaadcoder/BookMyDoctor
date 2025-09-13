import { Router } from "express";
import upload from '../middlewares/multer.js'

import { getUserData, loginUser, registerUser } from "../controllers/userController.js";
import { userAuth } from "../middlewares/userAuth.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile-data", userAuth, getUserData);

export default userRouter;
