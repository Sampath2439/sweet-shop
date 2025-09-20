import mongoose from 'mongoose';
// FIX: Import 'exit' from 'process' to resolve TypeScript type error for process.exit.
import { exit } from 'process';

const connectDB = async () => {
    try {
        const mongoUri = "mongodb+srv://sampath:Gnana2439@cluster0.4jny0lf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" ;
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        const conn = await mongoose.connect(mongoUri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        // FIX: Use the imported 'exit' function.
        exit(1);
    }
};

export default connectDB;
