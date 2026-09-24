import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
const registerUser=asyncHandler(async (req,res)=>{
    const {fullname,email,username,password}=req.body;
    console.log("email: ",email)

    res.json({
        message: "ok"
    })
})

export {registerUser}