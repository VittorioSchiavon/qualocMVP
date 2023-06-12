import Product from "../models/Product.js";
import Store from "../models/Store.js";
import Review from "../models/Review.js";
import User from "../models/User.js";

/* READ */
export const getProductReviews = async (req, res) => {
  try {
    const review = await Review.find({ productID: req.params.productID });
    return res.status(200).json(review);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteProductReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.reviewID });
  if(!review) return  res.status(400).send("There is no such review");
  if(review.userID!= req.user.id) res.status(400).send("You don't have access to this review");

  const product = await Product.findOne({ _id: review.productID });
  if (!product) res.status(400).send("Product does not exist");
  const shop = await Store.findOne({ _id: product.shopID });
  if (!shop) res.status(400).send("shop does not exist");

  const allReviews = await Review.find({ productID: product._id });
  if (!allReviews) res.status(400).send("There are no reviews for this product");


  try {
      const removedReview = await Review.deleteOne({ _id: req.params.reviewID })
      if( removedReview){
          var newProductRating = 0;
          var newShopRating = 0;
          if (allReviews.length == 1 || product.rating == undefined || product.rating == null) {
              newProductRating = 0;
          } else {
              newProductRating = (product.rating * allReviews.length - review.productRating) / (allReviews.length - 1);
          }
          if (allReviews.length == 1 || shop.rating == undefined || shop.rating == null) {
              newShopRating = 0;
          } else {
              newShopRating = (product.rating * allReviews.length - review.serviceRating) / (allReviews.length - 1);
          }
          product.rating = newProductRating;
          shop.rating = newShopRating;
          const savedProduct = await product.save();
          const savedShop = await shop.save();
      }

      return res.status(200).json(removedReview);
  } catch (err) {
      res.status(400).send(err);

  }   
};
export const addProductReview = async (req, res) => {
  const reviewExist = await Review.findOne({ userID: req.user.id, productID: req.body.productID});
  if (reviewExist) res.status(400).send("You have already posted a review about this product");


  const product = await Product.findOne({ _id: req.body.productID });
  if (!product) res.status(400).send("Product does not exist");
  const shop = await Store.findOne({ _id: product.shopID });
  if (!shop) res.status(400).send("shop does not exist");

  const allReviews = await Review.find({ productID: req.body.productID });
  if (!allReviews) res.status(400).send("Product does not exist");

  var newProductRating = 0;
  var newShopRating = 0;
  if (allReviews.length == 0 || product.rating == undefined || product.rating == null) {
      newProductRating = req.body.productRating;
  } else {
      newProductRating = (product.rating * allReviews.length + req.body.productRating) / (allReviews.length + 1);
  }
  if (allReviews.length == 0 || shop.rating == undefined || shop.rating == null) {
      newShopRating = req.body.serviceRating;
  } else {
      newShopRating = (product.rating * allReviews.length + req.body.serviceRating) / (allReviews.length + 1);
  }
  product.rating = newProductRating;
  shop.rating = newShopRating;

  const review = new Review({
      userID: req.user.id,
      productID: req.body.productID,
      content: req.body.content,
      productRating: req.body.productRating,
      serviceRating: req.body.serviceRating,
  });
  try {
      const savedReview = await review.save();
      const savedProduct = await product.save();
      const savedShop = await shop.save();
      return res.send(savedReview);
  } catch (err) {
      return //res.send(err);

  }
};
/*
{
        "productID": "616e8ac6ba3324b7e71ce1b2",
        "orderID": "112245678",
        "content": "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown",
        "productRating": 3,
        "serviceRating": 3,
        "date": "12/12/21"
}
*/