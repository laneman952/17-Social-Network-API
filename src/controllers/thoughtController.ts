import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching thoughts", error });
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching thought by id", error });
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);

    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user found with this id!" });
      return
    }
    return res.json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error creating thought", error });
    return
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" });
    }
    return res.json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error updating thought", error });
    return
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    if (!thought) {
      res.status(404).json({ message: "No thought found with this id!" });
    }
    return res.json(thought);
  } catch (error) {
    res.status(500).json({ message: "Error deleting thought", error });
    return
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    );
    if (!thoughts) {
      res.status(404).json({ message: "No thought found with this id!" });
    }
    return res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: "Error adding reaction", error });
    return
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thoughts) {
      res.status(404).json({ message: "No thought found with this id!" });
    }
    return res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: "Error removing reaction", error });
    return
  }
};
