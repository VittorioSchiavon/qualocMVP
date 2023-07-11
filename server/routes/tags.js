import express from "express";
import {
  getTags, addTags, isInTags
} from "../controllers/tags.js";

const router = express.Router();

router.get("/", getTags);
router.post("/isIn/:tag", isInTags)
router.post("/add", addTags)


/* UPDATE */


export default router;
