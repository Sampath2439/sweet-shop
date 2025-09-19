import express from 'express';
import Order from '../models/orderModel';
import User from '../models/userModel';
import Sweet from '../models/sweetModel';
import mongoose from 'mongoose';

// Custom Request type to include user
// FIX: Changed from interface to type intersection to correctly inherit properties from Express.Request.
// FIX: Explicitly use express.Request to avoid conflicts with global types.
type AuthRequest = express.Request & {
  user?: { id: string; role: string };
};

// FIX: Explicitly use express.Response to avoid conflicts with global types.
export const createOrder = async (req: AuthRequest, res: express.Response) => {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        for (const item of items) {
            const sweet = await Sweet.findById(item.id).session(session);
            if (!sweet) {
                throw new Error(`Sweet with id ${item.id} not found.`);
            }
            if (sweet.quantity < item.purchaseQuantity) {
                throw new Error(`Not enough stock for ${item.name}.`);
            }
            sweet.quantity -= item.purchaseQuantity;
            await sweet.save({ session });
        }
        
        const order = new Order({
            user: req.user!.id,
            items: items.map((i: any) => ({...i, _id: undefined, id: undefined})),
            total
        });

        const createdOrder = await order.save({ session });
        
        // Clear user's cart
        await User.findByIdAndUpdate(req.user!.id, { $set: { cart: [] } }).session(session);

        await session.commitTransaction();
        session.endSession();

        const populatedOrder = await Order.findById(createdOrder._id).populate('user', 'email');

        res.status(201).json({
            ...populatedOrder?.toObject(),
            id: populatedOrder?._id
        });

    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: error.message });
    }
};


// FIX: Explicitly use express.Response to avoid conflicts with global types.
export const getMyOrders = async (req: AuthRequest, res: express.Response) => {
    try {
        const orders = await Order.find({ user: req.user!.id });
        const formattedOrders = orders.map(o => ({
            id: o._id.toString(),
            items: o.items.map((item: any) => ({ ...item.toObject(), id: item._id.toString() })),
            total: o.total,
            date: o.date.toISOString()
        }));
        res.json(formattedOrders);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// FIX: Explicitly use express.Response to avoid conflicts with global types.
export const getCart = async (req: AuthRequest, res: express.Response) => {
    try {
        const user = await User.findById(req.user!.id).populate({
            path: 'cart.sweet',
            model: 'Sweet'
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const cartItems = user.cart.map((item: any) => {
            if (!item.sweet) return null; // Handle case where a sweet was deleted
            return {
                id: item.sweet._id.toString(),
                name: item.sweet.name,
                category: item.sweet.category,
                price: item.sweet.price,
                quantity: item.sweet.quantity,
                imageUrl: item.sweet.imageUrl,
                description: item.sweet.description,
                purchaseQuantity: item.purchaseQuantity
            }
        }).filter(Boolean); // Filter out null items

        res.json(cartItems);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


// FIX: Explicitly use express.Response to avoid conflicts with global types.
export const saveCart = async (req: AuthRequest, res: express.Response) => {
    const { cart } = req.body;
     try {
        const user = await User.findById(req.user!.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cart = cart.map((item: any) => ({
            sweet: item.id,
            purchaseQuantity: item.purchaseQuantity
        }));

        await user.save();
        res.status(200).json({ message: 'Cart saved successfully' });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
