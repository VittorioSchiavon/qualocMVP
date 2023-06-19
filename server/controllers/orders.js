import Product from "../models/Product.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
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
  
export const deleteOrder= async (req, res) => {
    const order = await Order.findOne({ shopID: req.user.id, _id: req.params.id });
    if (!order) return res.status(400).send("No order found");
    try {
        console.log(order)
        order.status="canceled";
        // "notifyCancelment"
        const savedOrder = await order.save();
        res.send(savedOrder);
    } catch (err) {
        res.status(400).send(err);

    }
};



export const getShopOrders= async (req, res) => {
    const shopOrders = await Order.find({ shopID: req.user.id, status: req.params.status });
    if (!shopOrders) return res.status(400).send("No orders");
    res.send(shopOrders);
};

export const getClientOrders= async (req, res) => {
    const clientOrders = await Order.find({ clientID: req.user.id, status: req.params.status });
    if (!clientOrders) return res.status(400).send("No orders");
    res.send(clientOrders);
};

