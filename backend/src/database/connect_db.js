import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const DB_Instance = await mongoose.connect(process.env.DATABASE_URI, {
      dbName: "e_commerce_app",
    });
    console.log(`Database connection successful: ${DB_Instance.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
