import express from "express";
import {
  getProduct, getProducts, getStoreProduct, deleteProduct, addTempProduct, editProduct, searchProducts, getStoreTempProduct
} from "../controllers/products.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", getProduct);
router.get("/store/:id", getStoreProduct);
router.get("/store/temp/:id", getStoreTempProduct);

router.get("/", getProducts);
router.get("/search/:query", searchProducts);
//router.post("/addProduct", verifyToken, addProduct)
router.post("/editProduct", verifyToken, editProduct)
router.get("/deleteProduct/:productID", verifyToken, deleteProduct)
router.post("/addTempProduct", verifyToken, addTempProduct)

/* UPDATE */


export default router;
