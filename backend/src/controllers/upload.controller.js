import { uploadOnCloudinary } from "./../utils/cloudinary.js";

 export const uploadFile = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const localFilePath = req.file.path;
    const cloudResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudResponse) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload to Cloud",
      });
    }

    // Optional: If you still want to delete the file here, uncomment:
    // fs.unlinkSync(localFilePath);

    res.status(200).json({
      success: true,
      imageUrl: cloudResponse.secure_url,
      public_id: cloudResponse.public_id,
    });
  }