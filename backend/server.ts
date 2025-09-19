import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../backend-ts/config/db.js';
import authRoutes from '../backend-ts/routes/authRoutes.js';
import sweetRoutes from '../backend-ts/routes/sweetRoutes.js';
import orderRoutes from '../backend-ts/routes/orderRoutes.js';

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
