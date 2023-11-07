import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "../backend/routes/user.route.js"
import authRouter from "../backend/routes/auth.route.js"
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to DB');
}).catch((e)=>{
    console.log(e);
})

const app = express();
app.use(express.json());

app.use(cookieParser());


app.use("/api/user",userRouter);
app.use("/api/auth" , authRouter);
app.use("/api/listing" , listingRouter);


app.listen(5000,()=>{
    console.log(`Server is running on 5000`);
})


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

