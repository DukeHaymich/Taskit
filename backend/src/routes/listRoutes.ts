import { Router, RequestHandler } from "express";
import {
  getListsByBoard,
  createList,
  updateList,
  deleteList,
} from "../controllers/listController";

const router = Router();

router.get("/board/:boardId", getListsByBoard as RequestHandler);
router.post("/", createList as RequestHandler);
router.patch("/:id", updateList as RequestHandler);
router.delete("/:id", deleteList as RequestHandler);

export default router;
