const mongoose = require('mongoose');
const Order = require('../models/orderModel');

exports.getOrders = async (req, res) => {
  if (req.isAdmin) {
    try {
      const orders = await Order.find().limit(5);
      res.status(200).json({ result: orders.length, orders });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};

// Get User Orders
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;
  if (req.userId === userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId))
        return res.status(404).send(`No user with id: ${userId}`);
      const userOrders = await Order.find({ userId: req.params.userId });
      res.status(200).json(userOrders);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: err.message });
    }
  } else {
    res.status(403).json('You are allowed to see only your cart');
  }
};
exports.createOrder = async (req, res) => {
  if (req.userId) {
    try {
      const newOrder = await Order.create(req.body);
      newOrder.save();
      res.status(200).json(newOrder);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  if (req.isAdmin) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No order with id: ${id}`);
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { $set: req.body },
        {
          new: true,
        }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  if (req.isAdmin) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No order with id: ${id}`);
      await Order.findByIdAndRemove(id);
      res
        .status(204)
        .json({ product: null, message: 'Order has been deleted!' });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};

// GET MONTHLY INCOME

exports.getMonthlyIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const previousPreMonth = new Date(
    new Date().setMonth(previousMonth.getMonth() - 1)
  );
  if (req.isAdmin) {
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousPreMonth } } },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount',
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' },
          },
        },
      ]).sort({ _id: -1 });

      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
