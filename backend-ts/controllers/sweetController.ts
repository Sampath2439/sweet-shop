import express from 'express';
import Sweet from '../models/sweetModel';

// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
export const getSweets = async (req: express.Request, res: express.Response) => {
    try {
        const sweets = await Sweet.find({});
        // Map _id to id for frontend consistency
        const formattedSweets = sweets.map(s => ({
            id: s._id,
            name: s.name,
            category: s.category,
            price: s.price,
            quantity: s.quantity,
            imageUrl: s.imageUrl,
            description: s.description
        }));
        res.json(formattedSweets);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
export const addSweet = async (req: express.Request, res: express.Response) => {
    try {
        const { name, category, price, quantity, imageUrl, description } = req.body;
        const sweet = new Sweet({
            name, category, price, quantity, imageUrl, description
        });
        const createdSweet = await sweet.save();
        res.status(201).json({ ...createdSweet.toObject(), id: createdSweet._id });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
export const updateSweet = async (req: express.Request, res: express.Response) => {
    try {
        const { name, category, price, quantity, imageUrl, description } = req.body;
        const sweet = await Sweet.findById(req.params.id);

        if (sweet) {
            sweet.name = name;
            sweet.category = category;
            sweet.price = price;
            sweet.quantity = quantity;
            sweet.imageUrl = imageUrl;
            sweet.description = description;
            const updatedSweet = await sweet.save();
            res.json({ ...updatedSweet.toObject(), id: updatedSweet._id });
        } else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
export const deleteSweet = async (req: express.Request, res: express.Response) => {
    try {
        const sweet = await Sweet.findById(req.params.id);
        if (sweet) {
            await sweet.deleteOne();
            res.json({ message: 'Sweet removed' });
        } else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
