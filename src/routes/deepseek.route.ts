import { Router } from "express";
import { chatWithSunaina } from "../controllers/deepseek.controller";

const router = Router();

router.post("/chat", chatWithSunaina);

export default router;
