import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import List from "../models/List";
import Card from "../models/Card";
import Board from "../models/Board";

interface ListBody {
  title?: string;
  board?: string;
  position?: number;
}

// Get all lists for a board
export const getListsByBoard = async (
  req: Request<ParamsDictionary>,
  res: Response
) => {
  try {
    const lists = await List.find({ board: req.params.boardId })
      .sort({ position: 1 })
      .populate("cards");
    res.json(lists);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a list
export const createList = async (
  req: Request<{}, {}, ListBody>,
  res: Response
) => {
  try {
    // Get the highest position
    const maxPositionList = await List.findOne({ board: req.body.board }).sort({
      position: -1,
    });
    const position = maxPositionList ? maxPositionList.position + 1 : 0;

    const list = new List({
      title: req.body.title,
      board: req.body.board,
      position,
    });

    const newList = await list.save();

    // Add list to board
    await Board.findByIdAndUpdate(req.body.board, {
      $push: { lists: newList._id },
    });

    res.status(201).json(newList);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update a list
export const updateList = async (
  req: Request<ParamsDictionary, {}, ListBody>,
  res: Response
) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    if (req.body.title) list.title = req.body.title;
    // Update position
    if (req.body.position !== undefined) {
      const [min, max] =
        list.position < req.body.position
          ? [list.position, req.body.position]
          : [req.body.position, list.position];

      const updatedLists = await List.find({
        board: list.board,
        position: { $gte: min, $lte: max },
      });

      updatedLists.forEach((updatedList: any) => {
        // Skip updating the position if the list is the same
        if (updatedList._id.equals(list._id)) return;
        if (req.body.position !== undefined) {
          // Linting
          updatedList.position += list.position > req.body.position ? 1 : -1;
        }
      });
      list.position = req.body.position;
      updatedLists.map(async (updatedList: any) => {
        await updatedList.save();
      });
    }

    const updatedList = await list.save();
    res.json(updatedList);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a list
export const deleteList = async (
  req: Request<ParamsDictionary>,
  res: Response
) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    // Find and delete all cards associated with the list
    await Card.deleteMany({ list: list._id });

    // Remove list reference from board
    await Board.findByIdAndUpdate(list.board, { $pull: { lists: list._id } });

    // Delete the list
    await list.deleteOne();
    res.json({ message: "List and associated cards deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting list:", error);
    res.status(500).json({ message: error.message });
  }
};
