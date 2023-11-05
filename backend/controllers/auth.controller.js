import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";

export const signup = async (req,res,next)=>{
    try {
        const {username ,email ,password} = req.body;

        const hashedPassword = bcryptjs.hashSync(password,10);

        const newUser = await User.create({
            username,
            email,
            password : hashedPassword
        })

        return res.status(201).json(newUser);
    } catch (error) {
        next(error)
    }
}

