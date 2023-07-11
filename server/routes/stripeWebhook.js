import express from "express";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Stripe from "stripe";

import nodemailer from "nodemailer";

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
      console.log("sessioneeeeeeeeeeeeeeeeeeeeeeeeeeee");
      console.dir(sessionWithLineItems, { depth: null });

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
    var orderCreated = await createOrders(cart, session, lineItems);
    sendEmail(orderCreated, "email");

    cart.products = [];
    const savedCart = await cart.save();
    //console.log("cleared cart", cart);
  } catch (err) {
    console.log("can't clear cart of:", session.client_reference_id);
    console.log("because:", err);
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
          address:
            session.customer_details.address.line1 +
            " " +
            session.customer_details.address.line2 +
            " " +
            session.customer_details.address.city +
            ", " +
            session.customer_details.address.postal_code,
          products: activeProducts,
          totalPrice: totalProductPrice /*+ shippingCost*/,
          totalProductPrice: totalProductPrice,
          /*shippingPrice: shippingCost,*/
          checkoutSessionID: session.id,
          /*ShippingDate: Date(Date.now() + 3),
          shippingAttempt: 0,*/
        };
        allOrders.push(order);
        alreadyCheckedShop.push(activeShop);
        activeShop = "";
        activeProducts = [];
      }
    });

    const savedOrders = await Order.create(allOrders);
    return savedOrders;
  } catch (err) {
    console.log(err);
  }
}
export default router;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "scrotusauro69@gmail.com",
    pass: "hrtlrnwnytfurgyn",
  },
});

async function sendEmail(orders, email) {
  console.log("sending email to user", email);
  var htmlText = `
  <body>
  <h1>Congratulazioni, Ordine Effettuato!</h1>
  <strong>Gentile Cliente,</strong>

  <p>Desideriamo ringraziarti per il tuo ordine! Siamo lieti di comunicarti che il pagamento è stato ricevuto con successo.</p>
  <p>Siamo in contatto con i negozi coinvolti e stiamo attendendo la loro conferma.</p>
  <p>Ti informeremo tempestivamente tramite email non appena riceveremo la conferma da parte loro, e la tua merce sarà spedita nel più breve tempo possibile.</p>
  <p>Per visualizzare tutti i dettagli relativi al tuo ordine, ti invitiamo a visitare la pagina del tuo profilo sulla nostra piattaforma.</p>
  <p>Se hai domande o necessiti di assistenza, non esitare a contattarci. Siamo a tua disposizione per fornirti supporto!</p>
  <p>Ti ringraziamo ancora per aver scelto di fare acquisti presso Qualoc.</p>
  <p>Ti auguriamo una piacevole giornata!</p>
   </body>
  </html>`;

  let info = await transporter.sendMail({
    from: {
      name: "qualoc",
      address: "scrotusauro69@gmail.com",
    },
    to: "vittorioschiavon99@gmail.com", // list of receivers
    subject: "Email di conferma ordine", // Subject line
    html: htmlText,
  });
  console.log("sent email to user", email);
}
