import Product from "../models/Product.js";
import Store from "../models/Store.js";
import Post from "../models/Post.js";
import Review from "../models/Review.js";
import User from "../models/User.js";


export const getStorePosts = async (req, res) => {
  try {
    const posts = await Post.find({ productID: req.params.storeID });
    return res.status(200).json(posts);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getPostByID = async (req, res) => {
    try {
      const post = await Post.findById(req.params.postID);
      return res.status(200).json(post);
    } catch (err) {
      res.status(400).send(err);
    }
  };

  export const getRecentPosts = async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 }).limit(5);
      return res.status(200).json(posts);
    } catch (err) {
      res.status(400).send(err);
    }
  };

export const deletePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postID });
  if(!post) return  res.status(400).send("There is no such post");
  const store = await Store.findOne({ ownerID: req.user.id});

  if(post.storeID!= store._id) res.status(400).send("You don't have access to this review");




  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postID })

    return res.status(200).json(removedReview);
  } catch (err) {
      res.status(400).send(err);

  }   
};
export const addPost = async (req, res) => {
      const store = await Store.findOne({ ownerID: req.user.id });
  const post = new Post({
    storeID: store._id,
    picture: req.file?.filename? req.file?.filename: "",
    text: req.body.text,
  });
  
  try {
    const savedPost = await post.save();
    res.status(200).send(savedPost);
  } catch (err) {
    res.status(400).send(err);
  }
}
