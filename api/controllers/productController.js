const mongoose = require('mongoose');
const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  const query = req.query.new;
  try {
    const products = query
      ? await Product.find().sort({ _id: -1 }).limit(Number(query))
      : await Product.find();

    res.status(200).json({ result: products.length, products });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No product with id: ${id}`);
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  }
};
exports.createProduct = async (req, res) => {
  if (req.isAdmin) {
    try {
      const newProduct = await Product.create(req.body);
      newProduct.save();
      res.status(200).json(newProduct);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  let productData = req.body;
  if (req.isAdmin) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No product with id: ${id}`);
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: productData },
        {
          new: true,
        }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (req.isAdmin) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No product with id: ${id}`);
      await Product.findByIdAndRemove(id);
      res
        .status(204)
        .json({ product: null, message: 'Product has been deleted!' });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Something went wrong', error: error.message });
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
exports.getProductStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  if (req.isAdmin) {
    try {
      const data = await Product.aggregate([
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

      const { _id: month, total } = data[0];
      res.status(200).json({ month, productsPerMonth: total });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('You are not allowed to perform this operation!');
  }
};
