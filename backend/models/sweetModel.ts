import mongoose from 'mongoose';
import { Sweet as ISweet } from '../../types.ts'; 

const sweetSchema = new mongoose.Schema<Omit<ISweet, 'id'>>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true }
});

const Sweet = mongoose.model('Sweet', sweetSchema);
export default Sweet;
