import express from "express";
import { login, verify } from "../controllers/auth.js";
import {  } from "jsonwebtoken";

const router = express.Router();

router.post("/login", login);
router.get("/verify/:id", verify);

//router.post("/registerUser", registerUser);


export default router;