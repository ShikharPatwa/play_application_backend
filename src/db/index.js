import mongoose from "mongoose"

const connectDb=async ()=>{
    try{
       const connectionInstance= await mongoose.connect(process.env.MONGODB_URI)
       console.log("MongoDB Connected : ",`${connectionInstance.connection.host}`)
    }catch(error){
        console.log("mongoDb connection error ", error);
        process.exit(1)
    }
}

export default connectDb;