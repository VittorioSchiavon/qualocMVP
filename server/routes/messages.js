import express from "express";
import {getConversationMessages, sendMessage} from "../controllers/messages.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:conversationID", verifyToken, getConversationMessages);
router.post("/", verifyToken, sendMessage);
/* UPDATE */

export default router;