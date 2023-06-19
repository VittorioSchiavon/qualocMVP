import Product from "../models/Product.js";

import User from "../models/User.js";
import Cart from "../models/Cart.js";
import { loadStripe } from '@stripe/stripe-js';
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51NJEo0Kja0rAPefmCyCLK4Lx6tIuIPNcnvdjq7Q2R8vnQlipgb0FqBT2UUvg9UdKkotXRYIvRZ6WQkHbVmKAwjiH00WRe0l9hM");
//const stripe = await loadStripe(process.env.STRIPE_SECRET_KEY);

export const getCheckout = async (req, res) => {
  try {
    console.log("Heloooooooooo")
    const cart = await Cart.findOne({ userID: req.user.id });
    console.log(cart)
    if (!cart) return res.status(400).send("Cart does not exist");
    //check products in cart (quantity and location)
    var products = []
    cart.products.forEach(async (item) => {

      const prod = await Product.findById(item.productID);
      //console.log(item)
      products.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: prod.name,
            metadata:{
              productId: item.productID.toString(),
              productOption: item.option,
              shopId: prod.shopID.toString(),
            }
          },
          unit_amount: prod.price * 100,
        },
        quantity: item.quantity,
      })
    });
    console.dir(products, {depth: 100})
    const costumer= await User.findOne({ _id: req.user.id});
    var costumerEmail= costumer.email+".com"
    //const shippingC = await getShippingCost(req.user.id)
    const session = await stripe.checkout.sessions.create({
      client_reference_id: req.user._id,
      customer_email: costumerEmail,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: products,/*
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingC * 100,
              currency: 'eur',
            },
            display_name: 'totale costo di spedizioni',
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 1,
              },
              maximum: {
                unit: 'business_day',
                value: 2,
              },
            }
          }
        }
      ],*/
      success_url: `http://localhost:3000/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/carrello",
    })
    console.log("before payment",session)
    return res.status(200).send({ url: session.url })
  } catch (err) {
    console.log(err.message)
    res.status(400).send(err);

  }
}

export const getSessionID = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(
    req.params.id,
    {
      expand: ['line_items'],
    }
  );
  res.send(session);

}


async function getShippingCost(id) {
  let cart = []
  cart = await Cart.findOne({ userID: id });
  if (!cart) return res.status(400).send("Cart does not exist");
  var shops = new Map();
  shippingCost = 0;

  cart.products.forEach(el => {
    console.log( el.product.shippingCost)
    if (!shops.has(el.product.shopId)){
      shippingCost += el.product.shippingCost;
      shops.set(el.product.shopId.toString(), el.product.shippingCost);
    }else{
      if(shops.get(el.product.shopId)<el.product.shippingCost){
        shippingCost=shippingCost-shops.get(el.product.shopId)+el.product.shippingCost
        shops.set(el.product.shopId.toString(), el.product.shippingCost)
      }
    }
  })
  return shippingCost;
}
