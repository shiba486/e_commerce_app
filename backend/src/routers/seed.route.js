import { Router } from "express";
import { seedUser } from "../controllers/seed.controller.js";

const seedRouter = Router()

seedRouter.get("/users",seedUser)

export default seedRouter;