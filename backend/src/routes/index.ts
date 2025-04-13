import { Router } from "express";
import boardRoutes from "./boardRoutes";
import listRoutes from "./listRoutes";
import cardRoutes from "./cardRoutes";
import authRoutes from "./authRoutes";

const router: Router = Router();

router.use("/auth", authRoutes);
router.use("/boards", boardRoutes);
router.use("/lists", listRoutes);
router.use("/cards", cardRoutes);

export default router;
