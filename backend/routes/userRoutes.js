import { Router } from "express";
import { getUserData, loginUser, registerUser } from "../controllers/userController.js";
import { userAuth } from "../middlewares/userAuth.js";

const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile-data", userAuth, getUserData);

export default userRouter;
