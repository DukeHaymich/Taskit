import { RequestHandler, Router } from "express";
import {
  createCard,
  deleteCard,
  getCardsByList,
  updateCard,
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
