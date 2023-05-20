import express from "express";
import { login, registerStore, registerUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/registerStore", registerStore);
router.post("/registerUser", registerUser);


export default router;