const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  const query = req.query.new;
  if (req.isAdmin) {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(Number(query))
        : await User.find();
      const info = users.map((user) => {
        const { password, ...info } = user._doc;
        return info;
      });
      res.status(200).json({ users: info });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', err: err.message });
    }
  } else {
    res.status(403).json('You are not allowed to see all users!');
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No user with id: ${id}`);
    const user = await User.findById(id);
    const { password, ...info } = user._doc;
    res.status(200).json({ user: info });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  let userData = req.body;
  console.log(req.body);

  if (req.userId === id || req.isAdmin) {
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      userData = { ...userData, password: hashedPassword };
    }

    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No user with id: ${id}`);
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: userData },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You can update only your account');
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (req.userId === id || req.isAdmin) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No user with id: ${id}`);
      await User.findByIdAndRemove(id);
      res.status(204).json({ user: null, message: 'User has been deleted!' });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You can update only your account');
  }
};
exports.getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  if (req.isAdmin) {
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: '$createdAt' },
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: 1 },
          },
        },
      ]);

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed to perform  this action!');
  }
};
