import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);  // ✅ No need for extra options
        console.log("✅ MongoDB Connected!");
    } catch (error) {
        console.error("❌ Database Connection Failed!", error);
        process.exit(1);
    }
};

export default connectDB;
