import { Router } from "express";
import { registerUser,loginUser,logoutUser,getAllUsers, deleteUser } from "../controllers/user.controller.js";
import {admin,Authenticated}from "./../middlewares/auth.middleware.js"
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);  

//admin only
userRouter.get('/', Authenticated, admin, getAllUsers);
userRouter.delete('/:id', Authenticated, admin, deleteUser);

export default userRouter;