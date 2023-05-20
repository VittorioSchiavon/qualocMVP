import express from "express";
import {
  getStore, getStores} from "../controllers/stores.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getStore);
router.get("/", verifyToken, getStores);


/* UPDATE */

export default router;