"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const types_1 = require("../types"); // Using frontend types for consistency
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(types_1.Role), default: types_1.Role.USER },
    cart: [
        {
            sweet: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Sweet', required: true },
            purchaseQuantity: { type: Number, required: true, min: 1 }
        }
    ]
}, {
    timestamps: true
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map