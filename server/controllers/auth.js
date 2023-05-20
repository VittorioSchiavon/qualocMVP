import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Store from "../models/Store.js";

/* REGISTER USER */
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* REGISTER STORE */
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

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const store = await Store.findOne({ email: email });
    if (!user && !store)
      return res.status(400).json({ msg: "User or Store do not exist. " });

    if (user != null) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials. " });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    }
    if (store != null) {
      const isMatch = await bcrypt.compare(password, store.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials. " });

      const token = jwt.sign({ id: store._id }, process.env.JWT_SECRET);
      delete store.password;
      res.status(200).json({ token, store });
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
