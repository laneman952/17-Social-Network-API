import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import User from '../models/User';

export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};