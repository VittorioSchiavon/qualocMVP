import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Store from "../models/Store.js";
import Cart from "../models/Cart.js";

/* REGISTER USER */
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, isOwner } = req.body;
    console.log(req.body);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      isOwner,
    });
    const savedUser = await newUser.save();

    const cart = new Cart({
      userID: savedUser._id,
      products: [],
    });
    const savedCart = await cart.save();

    if (!isOwner) return res.status(200).json(savedUser);

    console.log(req.body);

    const newStore = new Store({
      name: req.body.name,
      description: req.body.description,
      ownerID: savedUser._id,
      street: req.body.street,
      streetNumber: req.body.streetNumber,
      city: req.body.city,
      country: req.body.country,
      postalCode: req.body.postalCode,
      tags: req.body.tags.split(","),
    });
    const savedStore = await newStore.save();
    console.log("saved store", savedStore);

    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

/* REGISTER STORE 
export const registerStore = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      shopName,
      email,
      phone,
      tags,
      password,
      description,
      street,
      city,
      state,
      zip,
    } = req.body;
    console.log(req.body);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newStore = new Store({
      firstName,
      lastName,
      shopName,
      email,
      phone,
      tags,
      description,
      street,
      city,
      state,
      zip,
      password: passwordHash,
    });
    const savedStore = await newStore.save();
    res.status(201).json(savedStore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/
/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User do not exist. " });

    if (user != null) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials. " });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
