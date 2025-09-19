import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [
        {
            name: { type: String, required: true },
            category: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            imageUrl: { type: String, required: true },
            description: { type: String, required: true },
            purchaseQuantity: { type: Number, required: true }
        }
    ],
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


const Order = mongoose.model('Order', orderSchema);
export default Order;
