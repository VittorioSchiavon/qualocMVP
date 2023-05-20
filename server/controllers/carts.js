import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cart from "../models/Cart.js";


export const getCart = async (req, res) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOne({ userID: userId });
      if (!cart) return res.status(400).send("Cart does not exist");
      res.send(cart.products);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };


  
export const getPrice = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userID: req.user._id });
        if (!cart) return res.status(400).send("Cart does not exist");
        totalPrice = 0;
        var shops = new Map();
        shippingCost = 0;
        cart.products.forEach(el => {
    
            console.log(el.product.shippingCost)
            if (!shops.has(el.product.shopId)) {
                shippingCost += el.product.shippingCost;
                shops.set(el.product.shopId.toString(), el.product.shippingCost);
            } else {
                if (shops.get(el.product.shopId) < el.product.shippingCost) {
                    shippingCost = shippingCost - shops.get(el.product.shopId) + el.product.shippingCost
                    shops.set(el.product.shopId.toString(), el.product.shippingCost)
                }
            }
            totalPrice += el.product.price * el.productQuantity;
        })
    
        res.status(200).send({ totalPrice: totalPrice+shippingCost, shippingCost: shippingCost, couponDiscount: 0 })
    } catch (err) {
        res.status(404).json({ message: err.message });
      }
    };
    
    
