import Product from "../models/Product.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const webhook= async (request, response) => {
  //console.log(request.body.type)
  const payload = request.body;
  const sig = request.headers['stripe-signature'];
  const endpointSecret = 'whsec_cUDQdIhYeKJXfA1xdey9fqFgKVvRXGoi';
  let event = request.body;
  //console.log(event)

  try {
    //console.log("here")
    //console.log(JSON.stringify(payload))
    //console.log(sig)
    //console.log(endpointSecret)
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.log(err)
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }


  // Handle the checkout.session.completed event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;

      if (session.payment_status === 'paid') {
        fulfillOrder(session);
      }
      break;
    }

    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object;

      // Fulfill the purchase...
      fulfillOrder(session);

      break;
    }

    case 'checkout.session.async_payment_failed': {
      const session = event.data.object;

      // Send an email to the customer asking them to retry their order
      console.log("error payment failed")

      break;
    }
  }

  response.status(200);
};



async function fulfillOrder(session) {
  // TODO: fill me in
  const sessionProducts = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
    expand: ['data.price.product'],
  });
  console.log("PAYMENT SUCCESSFULL");
  //console.log(sessionProducts)
  //console.dir(sessionProducts, { depth: null });
  //console.log("session", session)
  //create order
  const cart = await Cart.findOne({ userID: session.client_reference_id });
  //console.log(cart)
  if (!cart) return res.status(400).send("Error");
  const orderCreated = await createOrders(cart, session)

  //clean cart
  cart.products = []
  try {
    //const savedCart = await cart.save();
    console.log("cleared cart", cart)
  } catch (err) {
    console.log("can't clear cart of:", session.client_reference_id)
  }
  //notify/email people

  //send money to stores
}


async function createOrders(cart, session) {
  //let allProducts={};
  try {
    let user = await User.findOne({ _id: cart.userID });
    if (!user) return "Error";
    let alreadyCheckedShop = [];
    console.log("here fuck you")
    let allOrders = []
    activeProducts = []
    cart.products.forEach(function(el) {
      let totalProductPrice = 0
      let shippingCost = 0
      if (!alreadyCheckedShop.includes(el.product.shopId)) {
        //console.log("inserito", el.product.shopId)
        let activeShop = el.product.shopId
        //let activeShopData = await User.findOne({ _id: activeShop });
        //if (!activeShopData) return "Error";
        cart.products.forEach(element => {
          if (activeShop == element.product.shopId) {
            activeProducts.push(element);
            totalProductPrice += element.product.price * element.productQuantity
            shippingCost = shippingCost > element.product.shippingCost ? shippingCost : element.product.shippingCost
          }
        });

        const order = {
          shopID: activeShop,
          shopName: "activeShopData.username",
          clientID: cart.userID,
          clientEmail: user.email,
          shopEmail: "activeShopData.email",
          address: user.street + " " + user.city + " " + user.state + " " + user.zip,
          products: activeProducts,
          date: Date.now(),
          status: "active",
          totalPrice: totalProductPrice + shippingCost,
          totalProductPrice: totalProductPrice,
          shippingPrice: shippingCost,
          checkoutSessionID: session.id,
          ShippingDate: Date(Date.now() + 3),
          shippingAttempt: 0,
        }
        console.log(order)
        allOrders.push(order)
        alreadyCheckedShop.push(el.product.shopId)
        activeShop = ""
        activeProducts = []
      }
    });

    console.log(" ecco tutti gli ordini", allOrders)
    const savedOrders = await Order.create(allOrders[0])
    console.log(savedOrders);
  } catch (err) {
    console.log(err);

  }
}
