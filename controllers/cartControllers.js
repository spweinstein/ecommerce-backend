import Cart from "../models/cart.js";

export const getCart = async (req, res) => {
  try {
    const cart =
      (await Cart.findOne({ user: req.user._id })) ||
      (await Cart.create({ user: req.user._id }));
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const cart =
      (await Cart.findOne({ user: req.user._id })) ||
      (await Cart.create({ user: req.user._id }));
    const cartItem = cart.items.find((item) =>
      item.product.equals(req.params.productId),
    );
    console.log(cartItem);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.items.push({
        product: req.params.productId,
        quantity: 1,
      });
    }
    await cart.save();
    // console.log(cartItem);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart =
      (await Cart.findOne({ user: req.user._id })) ||
      (await Cart.create({ user: req.user._id }));
    const cartItem = cart.items.find((item) =>
      item.product.equals(req.params.productId),
    );
    console.log(cartItem);
    if (cartItem) {
      cartItem.quantity -= 1;
    }
    await cart.save();
    // console.log(cartItem);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.deleteOne({ user: req.user._id });
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
