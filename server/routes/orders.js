import express from "express";
import {
   getShopOrders, getClientOrders, changeStatusOrder
} from "../controllers/orders.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get('/shopOrders/:status',verifyToken, getShopOrders)
router.get('/clientOrders/:status',verifyToken, getClientOrders)
router.get('/changeStatusOrder/:id/:status',verifyToken, changeStatusOrder)



export default router;
