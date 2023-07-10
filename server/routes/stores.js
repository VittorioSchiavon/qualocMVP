import express from "express";
import {
  getStore, getStores, getMyStore, createStore, editStore} from "../controllers/stores.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/myStore",verifyToken, getMyStore);
router.get("/:id", getStore);
router.get("/", getStores);
router.post("/editStore", verifyToken, editStore)


/* UPDATE */

export default router;