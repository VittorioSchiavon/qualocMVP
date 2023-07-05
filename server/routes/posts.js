import express from "express";
import {
  getStorePosts, getPostByID, getRecentPosts, deletePost, addPost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:storeID", getStorePosts);
router.get("/:postID", getPostByID);
router.get("/recent", getRecentPosts);
router.delete("/delete/:postID",verifyToken, deletePost);
router.post("/add",verifyToken, addPost);


/* UPDATE */

export default router;