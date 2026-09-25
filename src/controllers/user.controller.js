import asyncHandler from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import {User}  from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser=asyncHandler(async (req,res)=>{
    const {fullname,email,username,password}=req.body;

    const existedUsed=User.findOne({
        $or: [{username},{email}]
    })

    if (existedUsed){
        throw new ApiError(409,"User with email or username already exists")
    }

    const avatarLocalpath= req.files?.avatar[0]?.path;
    const coverImageLocalpath= req.files?.coverImage[0]?.path;

    if(!avatarLocalpath){
        throw new ApiError(400,"Avatar file is required")
    }
    // console.log("email: ",email)

    const avatar=await uploadOnCloudinary(avatarLocalpath);
    const coverImage=await uploadOnCloudinary(coverImageLocalpath);

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user= User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()

    })

    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registring the user")
    }




    res.status(201).json(
        new ApiResponse(200, createdUser,"User created successfully")
    )
})

export {registerUser}