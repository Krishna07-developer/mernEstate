import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to DB');
}).catch((e)=>{
    console.log(e);
})

const app = express();




app.listen(5000,()=>{
    console.log(`Server is running on 5000`);
})