import express from "express";
import {
  getProduct, getProducts, getStoreProduct, deleteProduct, addProduct
} from "../controllers/products.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getProduct);
router.get("/store/:id", getStoreProduct);
router.get("/", getProducts);
router.post("/addProduct", verifyToken, addProduct)
router.post("/deleteProduct", verifyToken, deleteProduct)
/* UPDATE */


export default router;