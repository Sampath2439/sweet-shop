"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSweet = exports.updateSweet = exports.addSweet = exports.getSweets = void 0;
const sweetModel_1 = __importDefault(require("../models/sweetModel"));
// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
const getSweets = async (req, res) => {
    try {
        const sweets = await sweetModel_1.default.find({});
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSweets = getSweets;
// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
const addSweet = async (req, res) => {
    try {
        const { name, category, price, quantity, imageUrl, description } = req.body;
        const sweet = new sweetModel_1.default({
            name, category, price, quantity, imageUrl, description
        });
        const createdSweet = await sweet.save();
        res.status(201).json({ ...createdSweet.toObject(), id: createdSweet._id });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.addSweet = addSweet;
// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
const updateSweet = async (req, res) => {
    try {
        const { name, category, price, quantity, imageUrl, description } = req.body;
        const sweet = await sweetModel_1.default.findById(req.params.id);
        if (sweet) {
            sweet.name = name;
            sweet.category = category;
            sweet.price = price;
            sweet.quantity = quantity;
            sweet.imageUrl = imageUrl;
            sweet.description = description;
            const updatedSweet = await sweet.save();
            res.json({ ...updatedSweet.toObject(), id: updatedSweet._id });
        }
        else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateSweet = updateSweet;
// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
const deleteSweet = async (req, res) => {
    try {
        const sweet = await sweetModel_1.default.findById(req.params.id);
        if (sweet) {
            await sweet.deleteOne();
            res.json({ message: 'Sweet removed' });
        }
        else {
            res.status(404).json({ message: 'Sweet not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteSweet = deleteSweet;
//# sourceMappingURL=sweetController.js.map