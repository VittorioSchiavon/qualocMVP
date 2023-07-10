import Product from "../models/Product.js";
import Fuse from 'fuse.js';
import Store from "../models/Store.js";

/* READ */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    const store = await Store.findOne({ _id: product.shopID });
    product.storeName=store?.name;
    product.storeImage= store?.picture[0]
    return res.status(200).json({product: product, store:store});
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getProducts = async (req, res) => {
  try {
    const product = await Product.find({isTemp: false });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const removedProduct = await Product.deleteOne({ _id: req.params.productID });
    res.status(200).json({message: "product deleted"});
  } catch (err) {
    res.status(400).send(err);
  }
};

export const editProduct = async (req, res) => {
  try {

    var imageNames=[]
    console.log("req.body.picture",req.body.picture)
    if(req.body.picture!=null && !Array.isArray(req.body.picture)) imageNames=[req.body.picture]
    if(req.body.picture!=null && Array.isArray(req.body.picture)) imageNames.push(req.body.picture)

    console.log("imageNames",imageNames)

    req.files.forEach(image=> imageNames.push(image.filename))
    console.log("imageNames",imageNames)

    console.log("got: ", req.body)
    const product = await Product.findById(req.body._id);
    console.log("product",product)
    const editProduct = await Product.findByIdAndUpdate(req.body._id,
      { name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      shippingCost: req.body.shippingCost,
      tags: req.body.tags.split(","),
      options: req.body.options.split(","),
      picture: imageNames

  },{ new: true });
  console.log("cianeo")
  console.log("editProduct",editProduct)

    res.status(200).json(editProduct);
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }
};

export const getStoreProduct = async (req, res) => {
  try {
    const products = await Product.find({ shopID: req.params.id, isTemp: false });
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


export const addTempProduct = async (req, res) => {
  const store = await Store.findOne({ ownerID: req.user.id });
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    shippingCost: req.body.shippingCost,
    shopID: store._id,
    isTemp: true,
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

