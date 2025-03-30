import { Request, Response } from "express";
// import { ObjectId } from "mongodb";
import { User } from "../models/index.js";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user by userID", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
    return
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
    return
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error deleting users", error });
    return
  }
};

export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error adding friend", error });
    return
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
    }
    return res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error removing friend", error });
    return
  }
};
