import { Router, RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import Card from "../models/Card";
import List from "../models/List";
import {
  getCardsByList,
  createCard,
  updateCard,
  deleteCard,
} from "../controllers/cardController";

interface CardBody {
  title?: string;
  description?: string;
  list?: string;
  position?: number;
}

const router = Router();

router.get("/list/:listId", getCardsByList as RequestHandler);
router.post("/", createCard as RequestHandler);
router.patch("/:id", updateCard as RequestHandler);
router.delete("/:id", deleteCard as RequestHandler);

export default router;
