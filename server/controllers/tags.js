import Product from "../models/Product.js";
import Fuse from "fuse.js";
import Tag from "../models/Tag.js";

export const addTags = async (req, res) => {
  const tags = await Tag.find({tag: req.params.tag});
  var b=false
  if (tags!=null) b=true
  res.status(200).res.json(b);
};

export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).res.json(tags);
  } catch (err) {
    
    res.status(400).send(err);
  }
};


export const isInTags = async (req, res) => {
  try {
    const tags = await Tag.find({tag: req.params.tag});
    var b=false
    if (tags!=null) b=true
    res.status(200).res.json(b);
  } catch (err) {
    
    res.status(400).send(err);
  }
};
