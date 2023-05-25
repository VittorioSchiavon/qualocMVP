import express from "express";
import {
    getCart, addProduct, removeProduct} from "../controllers/carts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/",verifyToken, getCart);
router.post("/addProduct/",verifyToken, addProduct);
router.post("/removeProduct/",verifyToken, removeProduct);

export default router;