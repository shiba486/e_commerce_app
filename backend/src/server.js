import dotenv from "dotenv"
import {v2 as cloudinary} from "cloudinary";
import http from 'http'
import app from "./app.js"
import { connectDB } from "./database/connect_db.js";

dotenv.config({
    path:['./.env']
})
const port = process.env.PORT || 3000;
const server = http.createServer(app);

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`server is running at ${port}`);
    });
  })
  .catch((err) => {
    console.log(`database connnection error ${err}`);
  });







