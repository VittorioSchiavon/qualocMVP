import express from "express";
import {
   getCheckout, getSessionID
} from "../controllers/checkout.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/",verifyToken, getCheckout);
router.get("/session/:id",verifyToken, getSessionID);



export default router;
