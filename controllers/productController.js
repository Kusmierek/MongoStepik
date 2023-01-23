const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { name, price, sort } = req.query;
    console.log('123');

    if (name) {
      if (sort) {
        const products = await Product.find({ name: name }).sort(sort);
        return res.status(200).json(products);
      }
      const products = await Product.find({ name: name });
      return res.status(200).json(products);
    }

    if (price) {
      if (sort) {
        const products = await Product.find({ price: price }).sort(sort);
        return res.status(200).json(products);
      }
      const products = await Product.find({ price: price });
      return res.status(200).json(products);
    }

    if (sort) {
      const products = await Product.find({}).sort(sort);
      return res.status(200).json(products);
    }

    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, amount, description } = req.body;

    if ((await Product.find({ name: name })).length === 1) {
      return res.status(405).json('Name is used');
    }

    const newProduct = new Product({
      name: name,
      price: price,
      amount: amount,
      description: description,
    });

    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    if (req.body.name) {
      if ((await Product.find({ name: req.body.name })).length === 1) {
        return res.status(405).json('Name is used');
      }
    }

    await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json('Product updated');
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    if ((await Product.findById(req.params.id).length) === 0) {
      return res.status(204).json('No Content');
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};

const storeState = async (req, res) => {
  try {
    const state = await Product.aggregate([
      {
        $project: {
          _id: 0,
          name: 1,
          amount: 1,
          total: { $multiply: ['$amount', '$price'] },
        },
      },
    ]);
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  storeState,
};
