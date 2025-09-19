import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./config/db";
import authRoutes from './routes/authRoutes';
import sweetRoutes from './routes/sweetRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sweet Shop API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);
app.use('/api/orders', orderRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
