import UserOrder from "../models/userOrder.js";
import ShopOrder from "../models/shopOrder.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Shop from "../models/shop.js";
import shop from "../models/shop.js";

export const submitOrder = async (req, res) => {
  try {
    // console.log(req.body);
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );
    // 1. Validate that cart is not empty
    if (!cart || cart.items.length === 0) {
      return res
        .status(500)
        .json({ error: "Nothing in cart to submit order with" });
    }
    // 2. Group cart items by shop
    const itemsByShop = new Map();

    for (const cartItem of cart.items) {
      const product = cartItem.product;

      if (!product) {
        return res
          .status(404)
          .json({ error: "One or more products not found" });
      }

      const shopId = product.shop.toString();

      if (!itemsByShop.has(shopId)) {
        itemsByShop.set(shopId, []);
      }
      itemsByShop.get(shopId).push({
        product: product._id,
        quantity: cartItem.quantity,
        unitPrice: product.price,
        price: product.price * cartItem.quantity,
      });
    }

    // 3. Create UserOrder first
    const userOrder = await UserOrder.create({
      user: req.user._id,
      total: 0, // Will update after creating shop orders
      shopOrders: [],
    });

    console.log(itemsByShop);

    // 4. Create ShopOrder for each shop
    const shopOrderPromises = Array.from(itemsByShop.entries()).map(
      async ([shopId, items]) => {
        const subtotal = items.reduce((sum, item) => sum + item.price, 0);

        return ShopOrder.create({
          userOrder: userOrder._id,
          shop: shopId,
          items,
          subtotal,
          status: "pending",
        });
      },
    );

    const shopOrders = await Promise.all(shopOrderPromises);

    // 5. Update UserOrder with shopOrders
    userOrder.shopOrders = shopOrders.map((so) => so._id);
    await userOrder.save();

    // 6. Clear user's cart
    await Cart.findByIdAndDelete(cart._id);

    return res.status(200).json(userOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
    console.log(shop.user, req.user);
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

    // TODO: Add authorization check to ensure user owns this shop

    return res.status(200).json(shopOrder);
  } catch (error) {
    console.error("Error fetching shop order:", error);
    res.status(500).json({ error: error.message });
  }
};
