import express from "express";
import {getUserConversations, getConversation, createConversation} from "../controllers/conversations.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserConversations);
router.get("/find/:firstUserID/:secondUserID", verifyToken, getConversation);
router.post("/", verifyToken, createConversation);
/* UPDATE */

export default router;