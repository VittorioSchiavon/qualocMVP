import Product from "../models/Product.js";
import Fuse from 'fuse.js';
import Store from "../models/Store.js";

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
    const removedProduct = await Product.deleteOne({ _id: req.params.productID });
    res.status(200);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const editProduct = async (req, res) => {
  try {
    console.log("req",req.body)
    const editProduct = await Product.findByIdAndUpdate(req.body.productID,
      { name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      shippingCost: req.body.shippingCost,
      tags: req.body.tags,
      options: req.body.options,
  });
    res.status(200).json(editProduct);
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }
};

export const getStoreProduct = async (req, res) => {
  try {
    console.log("prodi di store")
    const products = await Product.find({ shopID: req.params.id });
    console.log(products)
    res.json(products);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const addProduct = async (req, res) => {
  /*NON E' SAFE !!!*/
  var imageNames =[]
  req.files.forEach(image=> imageNames.push(image.filename))

  const store = await Store.findOne({ ownerID: req.user.id });
  console.log("req.body", req.body)
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    brand: req.body.brand,
    shippingCost: req.body.shippingCost,
    shopID: store._id,
    tags: req.body.tags.split(","),
    options: req.body.options.split(","),
    picture: imageNames,
    isTemp: false,
  });
  try {
    const savedProduct = await product.save();
    res.status(200).send(savedProduct);
  } catch (err) {
    res.status(400).send(err);
  }
};



export const searchProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const options = {
      minMatchCharLength: 2,
      keys: [
          
        "name"/*,
        "tags",
        "description"*/
      ]
    };
    
    const fuse = new Fuse(products, options);
    var fuseResults=fuse.search(req.params.query);
    let finalResults=[];
    fuseResults.forEach(el=>{
        finalResults.push(el.item)
    })
    res.status(200).send(finalResults);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
};

