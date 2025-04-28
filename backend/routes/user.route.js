import { userRegistration, userLogin } from "../controller/user.controller.js";
import express from "express";
const userRouter = express.Router();

userRouter.post('/register', userRegistration);
userRouter.post('/login', userLogin);

export default userRouter;
