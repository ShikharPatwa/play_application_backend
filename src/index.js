import express from "express";
import connectDb from "./db/index.js";
import app from './app.js'

import dotenv from 'dotenv';

//config
dotenv.config();




connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is ruuning on Port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("Mongodb Error", err)
})