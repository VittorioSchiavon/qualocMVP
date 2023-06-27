import express from "express";
import {
  getUser, getPublicUser, setOnline, setOffline} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getUser);
router.get("/:userID", getPublicUser);
router.get("/setOnline/:id", setOnline);
router.get("/setOffline/:id", setOffline);

/* UPDATE */

export default router;