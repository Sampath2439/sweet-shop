import mongoose from 'mongoose';
// FIX: Import 'exit' from 'process' to resolve TypeScript type error for process.exit.
import { exit } from 'process';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        // FIX: Use the imported 'exit' function.
        exit(1);
    }
};

export default connectDB;
