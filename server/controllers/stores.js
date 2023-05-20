import Store from "../models/Store.js";

/* READ */
export const getStore = async (req, res) => {
  try {
    const { id } = req.params;
    const store = await Store.findById(id);
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
