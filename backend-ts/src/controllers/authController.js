"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExists = await userModel_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const user = await userModel_1.default.create({
            email,
            password: hashedPassword,
            role: email.toLowerCase() === 'admin@gmail.com' ? 'ADMIN' : 'USER'
        });
        if (user) {
            res.status(201).json({
                id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id.toString(), user.role)
            });
        }
        else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.registerUser = registerUser;
// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel_1.default.findOne({ email });
        if (user && (await bcryptjs_1.default.compare(password, user.password))) {
            res.json({
                id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id.toString(), user.role)
            });
        }
        else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=authController.js.map