import mongoose from 'mongoose';
import { Role } from '../../types.ts'; // Using frontend types for consistency

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(Role), default: Role.USER },
    cart: [
        {
            sweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Sweet', required: true },
            purchaseQuantity: { type: Number, required: true, min: 1 }
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
