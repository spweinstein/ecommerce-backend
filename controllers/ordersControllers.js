import UserOrder from "../models/userOrder.js";
import ShopOrder from "../models/shopOrder.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Shop from "../models/shop.js";

export const getUserOrders = async (req, res) => {
  try {
    const orders = await UserOrder.find({
      user: req.user._id,
    })
      .populate({
        path: "shopOrders",
        populate: [
          { path: "shop", select: "name description" },
          { path: "items.product", select: "name imgURL price" },
        ],
      })
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getShopOrders = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shopId);
    if (!shop.user.equals(req.user._id))
      return res
        .status(403)
        .json({ error: "Must own shop to access its orders" });

    const shopOrders = await ShopOrder.find({ shop: req.params.shopId })
      //   .populate({
      //     path: "userOrder",
      //     populate: { path: "user", select: "username" },
      //   })
      //   .populate("items.product", "name imgURL sku")
      .sort({ createdAt: -1 });

    return res.status(200).json(shopOrders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await UserOrder.findOne({
      _id: orderId,
      user: req.user._id,
    })
      .populate({
        path: "shopOrders",
        populate: [
          { path: "shop", select: "name description address" },
          {
            path: "items.product",
            select: "name description imgURL price brand sku",
          },
        ],
      })
      .populate("user", "username email");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getShopOrderById = async (req, res) => {
  try {
    const { shopId, orderId } = req.params;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }
    // Ensure shop belongs to user
    if (!shop.user.equals(req.user._id)) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const shopOrder = await ShopOrder.findById(orderId)
      .populate("shop", "name description address")
      .populate({
        path: "items.product",
        select: "name description imgURL price brand sku",
      })
      .populate({
        path: "userOrder",
        populate: { path: "user", select: "username email" },
      });

    if (!shopOrder) {
      return res.status(404).json({ error: "Shop order not found" });
    }

    return res.status(200).json(shopOrder);
  } catch (error) {
    console.error("Error fetching shop order:", error);
    res.status(500).json({ error: error.message });
  }
};
