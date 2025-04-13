import { Router, RequestHandler } from "express";
import { register, login, getCurrentUser } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/register", register as RequestHandler);
router.post("/login", login as RequestHandler);
router.get(
  "/me",
  authMiddleware as RequestHandler,
  getCurrentUser as RequestHandler
);

export default router;
