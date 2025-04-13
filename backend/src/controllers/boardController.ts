import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import Board from "../models/Board";
import User from "../models/User";
import { IUser } from "../models/User";

interface BoardBody {
  title?: string;
  description?: string;
}

// Extend Request type to include user
interface AuthRequest extends Request<{}, {}, BoardBody> {
  user: IUser;
}

// Get all boards
export const getAllBoards = async (_req: Request, res: Response) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a board
export const createBoard = async (req: AuthRequest, res: Response) => {
  const board = new Board({
    title: req.body.title,
    description: req.body.description,
    owner: req.user._id,
  });

  try {
    const newBoard = await board.save();

    await User.findByIdAndUpdate(req.user._id, {
      $push: { boards: newBoard._id },
    });

    res.status(201).json(newBoard);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get specific board with its lists
export const getBoardById = async (
  req: Request<ParamsDictionary>,
  res: Response
) => {
  try {
    const board = await Board.findById(req.params.id).populate("lists");
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.json(board);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update a board
export const updateBoard = async (
  req: Request<ParamsDictionary, {}, BoardBody>,
  res: Response
) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    if (req.body.title) board.title = req.body.title;
    if (req.body.description) board.description = req.body.description;

    const updatedBoard = await board.save();
    res.json(updatedBoard);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a board
export const deleteBoard = async (
  req: Request<ParamsDictionary>,
  res: Response
) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    await board.deleteOne();
    res.json({ message: "Board deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
