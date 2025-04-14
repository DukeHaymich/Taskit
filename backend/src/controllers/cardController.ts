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
  completed?: boolean;
  dueDate?: Date;
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
      completed: req.body.completed || false,
      dueDate: req.body.dueDate,
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
    if (req.body.completed !== undefined) card.completed = req.body.completed;
    card.dueDate = req.body.dueDate;

    // Handle list change
    if (req.body.list) {
      // Remove card from old list
      const oldList = await List.findById(card.list);
      if (oldList) {
        oldList.cards = oldList.cards.filter((cardId) => {
          return cardId.toString() !== (card as any)._id.toString();
        });

        // Update positions of cards in the old list
        for (const cardId of oldList.cards) {
          const updatedCard = await Card.findById(cardId);
          if (updatedCard && updatedCard.position > card.position) {
            updatedCard.position -= 1;
            await updatedCard.save();
          }
        }
        await oldList.save();
      }

      // Add card to new list
      const newList = await List.findById(req.body.list);
      if (newList) {
        // Update positions of cards in the new list
        for (const cardId of newList.cards) {
          const updatedCard = await Card.findById(cardId);
          if (
            updatedCard &&
            req.body.position !== undefined &&
            updatedCard.position >= req.body.position
          ) {
            updatedCard.position += 1;
            await updatedCard.save();
          }
        }
        newList.cards.push(card._id as mongoose.Types.ObjectId);
        await newList.save();
      }

      // Update the card's list reference
      card.list = new mongoose.Types.ObjectId(req.body.list);
    }
    if (req.body.position !== undefined) card.position = req.body.position;

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
