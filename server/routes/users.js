import express from "express";
import {
  getUser, getPublicUser} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUser);
router.get("/:userID", getPublicUser);
/* UPDATE */

export default router;