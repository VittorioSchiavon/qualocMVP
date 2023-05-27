import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userID: userId });
    if (!cart) return res.status(400).send("Cart does not exist");

    res.send(cart);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPrice = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userID: req.user.id });
    if (!cart) return res.status(400).send("Cart does not exist");
    totalPrice = 0;
    var shops = new Map();
    shippingCost = 0;
    cart.products.forEach((el) => {
      console.log(el.product.shippingCost);
      if (!shops.has(el.product.shopId)) {
        shippingCost += el.product.shippingCost;
        shops.set(el.product.shopId.toString(), el.product.shippingCost);
      } else {
        if (shops.get(el.product.shopId) < el.product.shippingCost) {
          shippingCost =
            shippingCost -
            shops.get(el.product.shopId) +
            el.product.shippingCost;
          shops.set(el.product.shopId.toString(), el.product.shippingCost);
        }
      }
      totalPrice += el.product.price * el.productQuantity;
    });

    res
      .status(200)
      .send({
        totalPrice: totalPrice + shippingCost,
        shippingCost: shippingCost,
        couponDiscount: 0,
      });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//add product
//router.post('/add/:productID/:productOption/:productQuantity', verify, async (req, res) => {

export const addProduct = async (req, res) => {
  /*
  const index = tempArray.findIndex(key => {
      return String(key.product._id) === req.body.productID && key.productOption == req.body.productOption
  });
  if (index != -1) {
      tempArray[index].productQuantity = parseInt(tempArray[index].productQuantity) + parseInt(tempObject.productQuantity);
  } else {
      tempArray.push(tempObject);
  }
*/
  try {
    const cart = await Cart.findOne({ userID: req.user.id });
    if (!cart) return res.status(400).send("Cart does not exist");
    const product = await Product.findOne({ _id: req.body.productID });
    if (!product) return res.status(400).send("Product does not exist");

    console.log("body", req.body)
    var tempArray = cart.products;
    const index = tempArray.findIndex((el) => {
      console.log("option el:", el.option)
      console.log("option body:", req.body.option)
      return el.productID == req.body.productID && el.option==req.body.option;
    });
    console.log(index);
    if (index != -1) {
      tempArray[index].quantity+=1
    }else{
      tempArray.push({
        productID: product._id,
        quantity: req.body.quantity,
        option: req.body.option,
        price: req.body.price        
      });
    }
    console.log(tempArray);
    const updatedCart = await Cart.updateOne(
      { userID: req.user.id },
      { $set: { products: tempArray } }
    );
    const tempCart = await Cart.findOne({ userID: req.user.id });
    res.status(200).send(tempCart);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//delete product

export const removeProduct = async (req, res) => {
  try {
    console.log(req.body)
    const cart = await Cart.findOne({ userID: req.user.id });
    if (!cart) return res.status(400).send("Cart does not exist");
  
    var tempArray = cart.products;
    const index = tempArray.findIndex((el) => {
      return String(el.productID) === req.body.productID;
    });
    console.log(index);
    if (index != -1) {
      tempArray.splice(index, 1);
    }
    const updatedCart = await Cart.updateOne(
      { userID: req.user.id },
      { $set: { products: tempArray } }
    );
    res.status(200)
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


export const editProduct = async (req, res) => {
  try {
    console.log(req.body)
    const cart = await Cart.findOne({ userID: req.user.id });
    if (!cart) return res.status(400).send("Cart does not exist");
  
    var tempArray = cart.products;
    const index = tempArray.findIndex((el) => {
      return String(el.productID) === req.body.productID;
    });
    console.log(index);
    if (index != -1) {
      tempArray[index]={
        productID: req.body.productID,
        quantity: req.body.quantity,
        option: req.body.option,
        price: req.body.price        
      }
    }
    const updatedCart = await Cart.updateOne(
      { userID: req.user.id },
      { $set: { products: tempArray } }
    );
    const tempCart = await Cart.findOne({ userID: req.user.id });
    res.status(200).send(tempCart);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};