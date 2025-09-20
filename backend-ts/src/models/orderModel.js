"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
//# sourceMappingURL=orderModel.js.map