import express from "express";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/webhook", async (request, response) => {
  try {
    /*
  const payload = request.body;
  const sig = request.headers['stripe-signature'];*/
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const endpointSecret =
      "whsec_871937aa14f91113a76d83df9ad888fc930fd6eb40624bb49454fbab51bef02c";


    const payload = request.body;
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("error", err);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    //console.log("✅ Success:", event.id);

    // Handle the checkout.session.completed event
    if (
      event.type === "checkout.session.completed" ||
      event.type === "payment_intent.succeeded"
    ) {
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items", "line_items.data.price.product"],
        }
      );

      //console.log("session \n", sessionWithLineItems);
      if (sessionWithLineItems.payment_status === "paid") {
        fulfillOrder(sessionWithLineItems);
      }
    }

    return response.status(200);
  } catch (err) {
    console.log("error", err);

    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
});

async function fulfillOrder(session) {
  const lineItems = session.line_items;
  //console.dir(lineItems, { depth: null });
  //console.log("PAYMENT SUCCESSFULL");

  //create order
  const cart = await Cart.findOne({ userID: session.client_reference_id });
  if (!cart) return;
  //const
  //clean cart
  try {
    orderCreated = await createOrders(cart, session, lineItems);
    cart.products = [];
    //const savedCart = await cart.save();
    //console.log("cleared cart", cart);
  } catch (err) {
    console.log("can't clear cart of:", session.client_reference_id);
  }
  //notify/email people

  //send money to stores
}

async function createOrders(cart, session, lineItems) {
  //let allProducts={};
  try {
    var alreadyCheckedShop = [];
    var allOrders = [];
    var activeProducts = [];
    lineItems.data.forEach((el) => {
      var totalProductPrice = 0;
      //let shippingCost = 0;
      if (!alreadyCheckedShop.includes(el.price.product.metadata.shopId)) {
        //console.log("inserito", el.product.shopId)
        var activeShop = el.price.product.metadata.shopId;
        //let activeShopData = await User.findOne({ _id: activeShop });
        //if (!activeShopData) return "Error";
        lineItems.data.forEach((element) => {
          if (activeShop == element.price.product.metadata.shopId) {
            const tempProduct = {
              productID: element.price.product.metadata.productId,
              quantity: element.quantity,
              price: element.amount_total,
              option: element.price.product.metadata.productOption,
            };
            activeProducts.push(tempProduct);
            totalProductPrice += element.amount_total * element.quantity;
            /*shippingCost =
              shippingCost > element.product.shippingCost
                ? shippingCost
                : element.product.shippingCost;*/
          }
        });

        const order = {
          shopID: activeShop,
          clientID: session.client_reference_id,
          address: JSON.stringify(session.customer_details.address),
          products: activeProducts,
          totalPrice: totalProductPrice /*+ shippingCost*/,
          totalProductPrice: totalProductPrice,
          /*shippingPrice: shippingCost,*/
          checkoutSessionID: session.id,
          /*ShippingDate: Date(Date.now() + 3),
          shippingAttempt: 0,*/
        };
        console.log("order", order);
        allOrders.push(order);
        alreadyCheckedShop.push(activeShop);
        activeShop = "";
        activeProducts = [];
      }
    });

    console.log(" ecco tutti gli ordini", allOrders);
    const savedOrders = await Order.create(allOrders);
    console.log("savedOrders", savedOrders);
  } catch (err) {
    console.log(err);
  }
}
export default router;
