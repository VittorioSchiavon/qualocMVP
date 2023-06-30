import express from "express";
import {
   searchProducts
} from "../controllers/search.js";

const router = express.Router();

router.get("/:query", searchProducts);

export default router;
