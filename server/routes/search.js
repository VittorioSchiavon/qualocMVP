import express from "express";
import {
   searchProducts, searchStores, searchStoresGPT
} from "../controllers/search.js";

const router = express.Router();

router.get("/products/:query", searchProducts);
router.get("/stores/:query", searchStores);
router.get("/storesGPT/:query", searchStoresGPT);



export default router;
