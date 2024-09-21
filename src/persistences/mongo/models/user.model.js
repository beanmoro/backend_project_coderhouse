import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    age: Number,
    cartId : String,
    role : {
        type: String,
        enum: ["user", "admin", "premium"],
        default: "user"
    },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    documents: [{name: String, reference: String}],
    last_connection: Date,
    
});

export const userModel = mongoose.model(userCollection, userSchema);