// module import
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan"

// router import
import { errorMiddleware } from "./middlewares/error.middleware.js";
import userRouter from "./routers/user.route.js";
import seedRouter from "./routers/seed.route.js";
import productRouter from "./routers/product.route.js";
import orderRouter from "./routers/order.route.js";
import cartRouter from "./routers/cart.route.js";
import uploadRouter from "./routers/upload.route.js";
import reviewRouter from "./routers/review.route.js";


// path
import path from "path"
 import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true,
}));
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    legacyHeaders: false,
    standardHeaders: 'draft-8',
})
app.use(limiter)
app.use(helmet())
app.use(morgan('combined'))

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '/src/uploads')));

// seedRouter 
app.use("/api/seed",seedRouter)
// using router in app
app.use("/api/v1/user",userRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/order",orderRouter);
app.use("/api/v1/cart",cartRouter);
app.use('/api/v1/reviews', reviewRouter);


// Add the upload route
app.use('/api/upload', uploadRouter);

app.use(errorMiddleware);
export default app;