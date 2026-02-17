import UserOrder from "../models/userOrder.js";
import ShopOrder from "../models/shopOrder.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Shop from "../models/shop.js";

// Hardcoded shipping options (will move to database later)
const SHIPPING_OPTIONS = {
  standard: { cost: 5.0, speed: "5-7 business days", label: "Standard" },
  express: { cost: 12.0, speed: "2-3 business days", label: "Express" },
  overnight: { cost: 25.0, speed: "1 business day", label: "Overnight" },
};

const TAX_RATE = 0.08; // 8% tax (can make configurable later)

const checkoutPreview = async (userId, shippingSelections = {}) => {
  const preview = {
    valid: true,
    errors: [],
    data: {
      shops: [],
      total: 0,
      tax: 0,
      shipping: 0,
      subtotal: 0,
    },
  };

  // 1. Fetch and validate cart
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // 2. Group items by shop and validate products
  const itemsByShop = new Map();
  let itemsTotal = 0;

  for (const cartItem of cart.items) {
    const product = cartItem.product;

    if (!product) {
      throw new Error("One or more products no longer exist");
    }

    // TODO: Add stock validation when inventory tracking is implemented
    // if (product.stock < cartItem.quantity) {
    //   throw new Error(`Insufficient stock for ${product.name}`);
    // }

    // TODO: check if prices have changed & return errors if they have so UI can notify

    const shopId = product.shop.toString();

    if (!itemsByShop.has(shopId)) {
      itemsByShop.set(shopId, {
        shopId,
        items: [],
        subtotal: 0,
        shippingMethod: shippingSelections[shopId] || "standard",
      });
    }

    const itemPrice = product.price * cartItem.quantity;
    itemsTotal += itemPrice;

    itemsByShop.get(shopId).items.push({
      product: product._id,
      productName: product.name, // For validation response
      quantity: cartItem.quantity,
      unitPrice: product.price,
      price: itemPrice,
    });

    itemsByShop.get(shopId).subtotal += itemPrice;
  }

  // 3. Fetch shop data for all shops in cart
  const shopIds = Array.from(itemsByShop.keys());
  const shops = await Shop.find({ _id: { $in: shopIds } }).select(
    "name description imgURL",
  );
  const shopsMap = new Map(shops.map((shop) => [shop._id.toString(), shop]));

  // 4. Validate and calculate shipping for each shop
  let shippingTotal = 0;

  for (const [shopId, shopData] of itemsByShop.entries()) {
    const shippingMethod = shopData.shippingMethod;

    if (!SHIPPING_OPTIONS[shippingMethod]) {
      throw new Error(
        `Invalid shipping method '${shippingMethod}' for shop ${shopId}`,
      );
    }

    const shippingCost = SHIPPING_OPTIONS[shippingMethod].cost;
    shippingTotal += shippingCost;

    const shop = shopsMap.get(shopId);

    preview.data.shops.push({
      shopId,
      shop: shop
        ? {
            _id: shop._id,
            name: shop.name,
            description: shop.description,
            imgURL: shop.imgURL,
          }
        : null,
      items: shopData.items,
      subtotal: shopData.subtotal,
      shippingTotal: shippingCost,
      taxTotal: TAX_RATE * (shopData.subtotal + shippingCost),
      grandTotal: shopData.subtotal + shippingCost,
      shippingSpeed: SHIPPING_OPTIONS[shippingMethod].speed,
      shippingLabel: SHIPPING_OPTIONS[shippingMethod].label,
    });
  }

  // 5. Calculate tax and grand total
  const taxTotal = (itemsTotal + shippingTotal) * TAX_RATE;
  const grandTotal = itemsTotal + shippingTotal + taxTotal;
  preview.data.shippingTotal = shippingTotal;
  preview.data.subtotal = itemsTotal;
  preview.data.taxTotal = taxTotal;
  preview.data.grandTotal = grandTotal;

  return preview;
};

/**
 * POST /checkout/validate
 * Validates cart and calculates totals based on shipping selections
 * Non-destructive - can be called multiple times
 */
export const validateCheckout = async (req, res) => {
  try {
    const { shippingSelections } = req.body;

    const validationResult = await checkoutPreview(
      req.user._id,
      shippingSelections,
    );

    // Return everything except internal data (cart, itemsByShop)
    const { cart, itemsByShop, ...responseData } = validationResult;
    return res.status(200).json(validationResult);
    // return res.status(200).json({
    //   ...responseData,
    //   availableShippingMethods: SHIPPING_OPTIONS,
    // });
  } catch (error) {
    console.error("Checkout validation error:", error);
    return res.status(400).json({ error: error.message });
  }
};

/**
 * POST /checkout/submit
 * Creates order after final validation
 * Integrates your existing submitOrder logic with validation
 */
export const submitCheckout = async (req, res) => {
  try {
    const { shippingSelections } = req.body;

    // 1. Perform final validation (re-validates prices, stock, etc.)
    const validationResult = await checkoutPreview(
      req.user._id,
      shippingSelections,
    );

    // Extract the totals and shops from preview data structure
    const { shops, subtotal, shippingTotal, taxTotal, grandTotal } =
      validationResult.data;

    // 2. Fetch cart to clear it later
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      throw new Error("Cart not found");
    }

    // 3. Create UserOrder
    const userOrder = await UserOrder.create({
      user: req.user._id,
      shopOrders: [],
      subtotal: subtotal,
      shippingTotal: shippingTotal,
      taxTotal: taxTotal,
      grandTotal: grandTotal,
      // TODO: Add when you implement addresses
      // shippingAddress: req.body.shippingAddress,
      // billingAddress: req.body.billingAddress,
    });

    // 4. Create ShopOrders
    const shopOrderPromises = shops.map(async (shopData) => {
      // Extract shipping method from shippingSelections
      const shippingMethod = shippingSelections[shopData.shopId] || "standard";

      return ShopOrder.create({
        userOrder: userOrder._id,
        shop: shopData.shopId,
        items: shopData.items,
        subtotal: shopData.subtotal,
        shippingMethod,
        shippingTotal: shopData.shippingTotal,
        taxTotal: shopData.taxTotal,
        grandTotal: shopData.grandTotal,
        shippingSpeed: shopData.shippingSpeed,
        status: "pending",
      });
    });

    const shopOrders = await Promise.all(shopOrderPromises);

    // 5. Update UserOrder with shopOrders references
    userOrder.shopOrders = shopOrders.map((so) => so._id);
    await userOrder.save();

    // 6. Clear cart
    await Cart.findByIdAndDelete(cart._id);

    // 7. Return populated order
    const populatedOrder = await UserOrder.findById(userOrder._id).populate({
      path: "shopOrders",
      populate: [
        { path: "shop", select: "name description" },
        { path: "items.product", select: "name imgURL price" },
      ],
    });

    return res.status(201).json(populatedOrder);
  } catch (error) {
    console.error("Checkout submission error:", error);
    return res.status(400).json({ error: error.message });
  }
};
