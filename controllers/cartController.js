const Cart = require('../models/Cart');
const mongoose = require('mongoose');


exports.addToCart = async (req, res, next) => {
  const userId = req.user.id;
  const { product, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(product)) {
    return res.status(400).json({ message: 'Invalid product ID' }); // fix
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }

  try {
    const newCartItem = new Cart({
      user: userId,
      product,
      quantity
    });

    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (err) {
    next(err);
  }
};



exports.updateCartItem = async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { quantity } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid cart item ID' });
  }
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1' });
  }
try {

  
    const cartItem = await Cart.findById(id);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    if (cartItem.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
cartItem.quantity = quantity;
    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.removeCartItem = async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid cart item ID' });
  }
  try {
    const cartItem = await Cart.findById(id);
    if (!cartItem) return res.status(404).json({ message: 'Cart item not found' });
    if (cartItem.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }


    await cartItem.deleteOne();
    res.json({ message: 'Cart item removed' });
  } catch (err) {
    next(err);
  }
};
