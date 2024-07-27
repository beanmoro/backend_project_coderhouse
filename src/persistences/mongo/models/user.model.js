import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    age: Number,
    cartId : String,
    role : {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

});

export const userModel = mongoose.model(userCollection, userSchema);