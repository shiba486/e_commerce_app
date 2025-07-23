import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",folder: "e_commerce_backend"
    });

    // remove the file after upload
    // fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    try {
      fs.unlinkSync(localFilePath);
    } catch (err) {
      console.warn("Failed to remove local file:", err.message);
    }
    return null;
  }
};

export { uploadOnCloudinary };
