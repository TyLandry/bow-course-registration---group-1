import express from "express";
import requireAuth from "../middleware/requiredAuth.js";
import { getMessages } from "../controllers/messageController.js";

const router = express.Router();

// GET /api/messages
router.get("/messages", requireAuth, getMessages);

export default router;
