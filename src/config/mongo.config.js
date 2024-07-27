import mongoose from "mongoose";

const uri = "mongodb+srv://CoderUser:123@codercluster.67vrm4s.mongodb.net/ecommerce";

export const connectDB = async () =>{
    try {
        mongoose.connect(uri);
        console.log("MongoDB connection established!");
    } catch (error) {
        console.error(error);
    }
}