const mongoose = require('mongoose');
const Cart = require('../models/cartModel');

exports.getCarts = async (req, res) => {
  if (req.isAdmin) {
    try {
      const carts = await Cart.find();
      res.status(200).json({ result: carts.length, carts });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  if (req.userId === userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No user with id: ${id}`);
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: err.message });
    }
  } else {
    res.status(403).json('You are allowed to see only your cart');
  }
};
exports.createCart = async (req, res) => {
  if (req.userId) {
    try {
      const newCart = await Cart.create(req.body);
      newCart.save();
      res.status(200).json(newCart);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
exports.updateCart = async (req, res) => {
  const { id } = req.params;
  let cartData = req.body;
  if (req.userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No cart with id: ${id}`);
      const updatedCart = await Cart.findByIdAndUpdate(
        id,
        { $set: cartData },
        {
          new: true,
        }
      );
      res.status(200).json(cartProduct);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
exports.deleteCart = async (req, res) => {
  const { id } = req.params;
  if (req.userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No cart with id: ${id}`);
      await Cart.findByIdAndRemove(id);
      res
        .status(204)
        .json({ product: null, message: 'Cart has been deleted!' });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
