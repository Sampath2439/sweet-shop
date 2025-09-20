"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCart = exports.getCart = exports.getMyOrders = exports.createOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const sweetModel_1 = __importDefault(require("../models/sweetModel"));
const mongoose_1 = __importDefault(require("mongoose"));
// FIX: Explicitly use express.Response to avoid conflicts with global types.
const createOrder = async (req, res) => {
    const { items, total } = req.body;
    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        for (const item of items) {
            const sweet = await sweetModel_1.default.findById(item.id).session(session);
            if (!sweet) {
                throw new Error(`Sweet with id ${item.id} not found.`);
            }
            if (sweet.quantity < item.purchaseQuantity) {
                throw new Error(`Not enough stock for ${item.name}.`);
            }
            sweet.quantity -= item.purchaseQuantity;
            await sweet.save({ session });
        }
        const order = new orderModel_1.default({
            user: req.user.id,
            items: items.map((i) => ({ ...i, _id: undefined, id: undefined })),
            total
        });
        const createdOrder = await order.save({ session });
        // Clear user's cart
        await userModel_1.default.findByIdAndUpdate(req.user.id, { $set: { cart: [] } }).session(session);
        await session.commitTransaction();
        session.endSession();
        const populatedOrder = await orderModel_1.default.findById(createdOrder._id).populate('user', 'email');
        res.status(201).json({
            ...populatedOrder?.toObject(),
            id: populatedOrder?._id
        });
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: error.message });
    }
};
exports.createOrder = createOrder;
// FIX: Explicitly use express.Response to avoid conflicts with global types.
const getMyOrders = async (req, res) => {
    try {
        const orders = await orderModel_1.default.find({ user: req.user.id });
        const formattedOrders = orders.map(o => ({
            id: o._id.toString(),
            items: o.items.map((item) => ({ ...item.toObject(), id: item._id.toString() })),
            total: o.total,
            date: o.date.toISOString()
        }));
        res.json(formattedOrders);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getMyOrders = getMyOrders;
// FIX: Explicitly use express.Response to avoid conflicts with global types.
const getCart = async (req, res) => {
    try {
        const user = await userModel_1.default.findById(req.user.id).populate({
            path: 'cart.sweet',
            model: 'Sweet'
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const cartItems = user.cart.map((item) => {
            if (!item.sweet)
                return null; // Handle case where a sweet was deleted
            return {
                id: item.sweet._id.toString(),
                name: item.sweet.name,
                category: item.sweet.category,
                price: item.sweet.price,
                quantity: item.sweet.quantity,
                imageUrl: item.sweet.imageUrl,
                description: item.sweet.description,
                purchaseQuantity: item.purchaseQuantity
            };
        }).filter(Boolean); // Filter out null items
        res.json(cartItems);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getCart = getCart;
// FIX: Explicitly use express.Response to avoid conflicts with global types.
const saveCart = async (req, res) => {
    const { cart } = req.body;
    try {
        const user = await userModel_1.default.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.cart = cart.map((item) => ({
            sweet: item.id,
            purchaseQuantity: item.purchaseQuantity
        }));
        await user.save();
        res.status(200).json({ message: 'Cart saved successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.saveCart = saveCart;
//# sourceMappingURL=orderController.js.map