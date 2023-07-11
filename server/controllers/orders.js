import Product from "../models/Product.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Store from "../models/Store.js";
import nodemailer from "nodemailer";


/*
router.get('/all', verify, async (req, res) => {
    const clientOrder = await Order.find({ clientID: req.user._id });
    if (!clientOrder) return res.status(400).send("No orders yet");
    const shopOrder = await Order.find({ shopID: req.user._id });
    if (!shopOrder) return res.status(400).send("No orders yet");
    res.send({asClient: clientOrder, asShop: shopOrder});
});
router.get('/asshop', verify, async (req, res) => {
    const shopOrder = await Order.find({ shopID: req.user._id });
    if (!shopOrder) return res.status(400).send("No orders yet");
    res.send(shopOrder);
});
router.get('/asclient', verify, async (req, res) => {
    const clientOrder = await Order.find({ clientID: req.user._id });
    if (!clientOrder) return res.status(400).send("No orders yet");
    res.send(clientOrder);
});

*/

export const changeStatusOrder = async (req, res) => {
  //non sicuro
  const order = await Order.findOne({
    _id: req.params.id,
  });
  if (!order) return res.status(400).send("No order found");
  try {
    order.status = req.params.status;
    // "notifyCancelment"
    const savedOrder = await order.save();
    sendEmail(order, "email");

    res.status(200).send(savedOrder);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getShopOrders = async (req, res) => {
  try {
    const store = await Store.findOne({ ownerID: req.user.id });
    var param = { shopID: store._id, status: req.params.status };
    if (req.params.status == "all") param = { shopID: store._id.toString() };
    const shopOrders = await Order.find(param);
    if (!shopOrders) return res.status(400).send("No orders");
    res.status(200).send(shopOrders);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getClientOrders = async (req, res) => {
    try {
    var param = { clientID: req.user.id, status: req.params.status };
    if (req.params.status == "all") param = {  clientID: req.user.id };
  const clientOrders = await Order.find(param);
  if (!clientOrders) return res.status(400).send("No orders");
  res.status(200).send(clientOrders);
} catch (err) {
  res.status(400).send(err);
}
}


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

async function sendEmail(order, email) {
  console.log("sending email to user", email);
  var htmlText = `
  <body>
  <h1>Aggiornamento Ordine ${order._id}</h1>
  <strong>Gentile Cliente,</strong>

  <p>Il Negozio ha aggiornato lo stato del tuo ordine a ${order.status}.</p>  <p>Per visualizzare tutti i dettagli relativi al tuo ordine, ti invitiamo a visitare la pagina del tuo profilo sulla nostra piattaforma.</p>
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
