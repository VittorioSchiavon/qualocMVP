import express from "express";
import {
  getProduct, getProducts, getStoreProduct, deleteProduct, addProduct, editProduct, searchProducts
} from "../controllers/products.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getProduct);
router.get("/store/:id", getStoreProduct);
router.get("/", getProducts);
router.get("/search/:query", searchProducts);
router.post("/addProduct", verifyToken, addProduct)
router.post("/editProduct", verifyToken, editProduct)
router.get("/deleteProduct/:productID", verifyToken, deleteProduct)

/* UPDATE */


export default router;
