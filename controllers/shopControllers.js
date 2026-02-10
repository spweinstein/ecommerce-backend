import Shop from "../models/shop.js";

const getShops = async (req, res) => {
  try {
    const shops = await Shop.find({});
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shopId);
    if (!shop) res.status(404).json({ message: "Shop not found" });
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createShop = async (req, res) => {
  try {
    req.body.user = req.user._id;
    const createdShop = await Shop.create(req.body);
    if (!createdShop)
      res.status(400).json({ message: "Issue creating product" });
    else res.status(201).json(createdShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateShop = async (req, res) => {
  try {
    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.shopId,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedShop)
      return res.status(404).json({ message: "Shop not found" });
    res.status(200).json(updatedShop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.shopId);
    if (!shop) res.status(404).json({ message: "Shop not found" });
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getShops, getShopById, createShop, updateShop, deleteShop };
