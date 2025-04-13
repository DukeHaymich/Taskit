import { Router, RequestHandler } from "express";
import {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../controllers/boardController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware as RequestHandler);

router.get("/", getAllBoards as RequestHandler);
router.get("/:id", getBoardById as RequestHandler);
router.post("/", createBoard as RequestHandler);
router.patch("/:id", updateBoard as RequestHandler);
router.delete("/:id", deleteBoard as RequestHandler);

export default router;
