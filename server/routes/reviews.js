import express from "express";
import {
  addProductReview, deleteProductReview, getProductReviews} from "../controllers/reviews.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:productID", getProductReviews);
router.delete("/delete/:reviewID",verifyToken, deleteProductReview);
router.post("/add",verifyToken, addProductReview);


/* UPDATE */

export default router;