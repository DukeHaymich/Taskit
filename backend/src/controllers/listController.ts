import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import List from "../models/List";
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
    const lists = await List.find({ board: req.params.boardId }).populate(
      "cards"
    );
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
    if (req.body.position !== undefined) list.position = req.body.position;

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

    // Remove list reference from board
    await Board.findByIdAndUpdate(list.board, { $pull: { lists: list._id } });

    await list.deleteOne();
    res.json({ message: "List deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
