import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { Authenticated } from "../middlewares/auth.middleware.js";
import { uploadFile } from "./../controllers/upload.controller.js"; // update path as needed

const uploadRouter = Router();

uploadRouter.post('/',Authenticated,upload.single("image"),uploadFile);

export default uploadRouter;
