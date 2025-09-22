import mongoose from "mongoose";
let isConnected = false;

const connectDB = async () => {
 try {
       
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }
        const db = await mongoose.connect(mongoUri);
        
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully");
    } 
    
    
    
    catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};

export default connectDB;
