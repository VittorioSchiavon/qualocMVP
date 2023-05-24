import express from "express";
import {
    getCart} from "../controllers/carts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/",verifyToken, getCart);

export default router;