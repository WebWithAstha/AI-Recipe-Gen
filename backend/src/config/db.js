import mongoose from "mongoose"

const connectDb = async ()=>{
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/ai-recipe-gen')
      console.log("db connection established");
    } catch (error) {
        console.log("db connection failed: " + error);        
    }
}

export default connectDb;