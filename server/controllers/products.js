import Product from "../models/Product.js";

/* READ */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(200).json(product);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const removedProduct = await Product.remove({ _id: req.params.productID });
    res.send(removedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getStoreProduct = async (req, res) => {
  try {
    const products = await Product.find({ shopId: req.params.id });
    res.json(products);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const addProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    shippingCost: req.body.shippingCost,
    shopID: req.user.id,
    tags: req.body.tags.split(","),
    options: req.body.options.split(","),
    isTemp: false,
  });
  try {
    console.log(product);
    const savedProduct = await product.save();
    res.status(200).send(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};
