import express from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id: string, role: string) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};

// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
export const registerUser = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({
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
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// FIX: Explicitly use express.Request and express.Response to avoid conflicts with global types.
export const loginUser = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
             res.json({
                id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id.toString(), user.role)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
