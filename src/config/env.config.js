import dotenv from "dotenv";

const enviroment = "DEV";
dotenv.config({path: enviroment === "PRODUCTION"} ? "./.env.prod" : "./.env");

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_CODE: process.env.SECRET_CODE
}