import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import mongoose from "mongoose";
import Card from "../models/Card";
import List from "../models/List";

interface CardBody {
  title?: string;
  description?: string;
  list?: string;
  position?: number;
}

// Get all cards for a list
export const getCardsByList = async (
  req: Request<ParamsDictionary>,
  res: Response
) => {
  try {
    const cards = await Card.find({ list: req.params.listId });
    res.json(cards);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Create a card
export const createCard = async (
  req: Request<{}, {}, CardBody>,
  res: Response
) => {
  try {
    // Get the highest position
    const maxPositionCard = await Card.findOne({ list: req.body.list }).sort({
      position: -1,
    });
    const position = maxPositionCard ? maxPositionCard.position + 1 : 0;

    const card = new Card({
      title: req.body.title,
      description: req.body.description,
      list: new mongoose.Types.ObjectId(req.body.list),
      position,
    });

    const newCard = await card.save();

    // Add card to list
    await List.findByIdAndUpdate(req.body.list, {
      $push: { cards: newCard._id },
    });

    res.status(201).json(newCard);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update a card
export const updateCard = async (
  req: Request<ParamsDictionary, {}, CardBody>,
  res: Response
) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    if (req.body.title) card.title = req.body.title;
    if (req.body.description !== undefined)
      card.description = req.body.description;
    if (req.body.position !== undefined) card.position = req.body.position;

    // Handle list change
    if (req.body.list && req.body.list !== card.list.toString()) {
      // Remove card from old list
      await List.findByIdAndUpdate(card.list, { $pull: { cards: card._id } });

      // Add card to new list
      await List.findByIdAndUpdate(req.body.list, {
        $push: { cards: card._id },
      });

      card.list = new mongoose.Types.ObjectId(req.body.list);
    }

    const updatedCard = await card.save();
    res.json(updatedCard);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a card
export const deleteCard = async (
  req: Request<ParamsDictionary>,
  res: Response
) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // Remove card reference from list
    await List.findByIdAndUpdate(card.list, { $pull: { cards: card._id } });

    await card.deleteOne();
    res.json({ message: "Card deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
