import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
      await mongoose.connect(process.env.MONGO_URI)
      console.log("db connection established");
    } catch (error) {
        console.log("db connection failed: " + error);        
    }
}

export default connectDb;