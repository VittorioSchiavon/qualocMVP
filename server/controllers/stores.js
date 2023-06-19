import Store from "../models/Store.js";
import User from "../models/User.js";
import mongoose from "mongoose";

/* READ */
export const getStore = async (req, res) => {
  try {
    const store = await Store.findOne({ _id: req.params.id });
    res.status(200).json(store);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getStores = async (req, res) => {
  try {
    const store = await Store.find();
    res.status(200).json(store);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getMyStore = async (req, res) => {
  try {
    const store = await Store.findOne({ ownerID: req.user.id });
    res.status(200).json(store);
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: err.message });
  }
};



export const createStore = async (req, res) => {
  var imageNames =[]
  req.files.forEach(image=> imageNames.push(image.filename))
  console.log(imageNames)
  try {
    const {
        name,
        tags,
        description,
        street,
        streetNumber,
        city,
        country,
        postalCode,
        phone,
    } = req.body;


    const newStore = new Store({
      name,
      tags: req.body.tags.split(","),
      description,
      ownerID: req.user.id,
      street,
      streetNumber,
      city,
      country,
      postalCode,
      phone,
      picture: imageNames,
    });

    const store = await Store.findOne({ ownerID: req.user.id });
    if(!store){
      console.log("esiste già uno store")
      return res.status(400).json({ error: "esiste già uno store" });
    }else{
      const savedStore = await newStore.save();
      console.log("saved store", savedStore);
    const editUser = await User.findByIdAndUpdate(req.user.id,
      { isOwner: true  });
  
      res.status(200).json(savedStore);
    }

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};
