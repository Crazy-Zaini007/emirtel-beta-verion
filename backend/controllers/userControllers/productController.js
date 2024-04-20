const mongoose = require('mongoose');
const User = require('../../database/user/userModel');
const Categories = require('../../database/admin/productModel');
const getAllProducts = async (req, res) => {
  try {
    let allProducts = [];

    // Check if user is authenticated
    if (!req.user) {
      const allCategories = await Categories.find({}).sort({ createdAt: -1 });
      for (const category of allCategories) {
        if (category.product) {
          allProducts.push(...category.product);
        }
      }
      return res.status(200).json({ data: allProducts });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allCategories = await Categories.find({}).sort({ createdAt: -1 });
    for (const category of allCategories) {
      if (category.product) {
        allProducts.push(...category.product);
      }
    }

    // Check wishlist
    const filteredProducts = allProducts.map(product => {
      const isWishlisted = user.wishlist.some(wish => wish.title === product.title);
      return { ...product.toObject(), wishlisted: isWishlisted };
    });

    return res.status(200).json({ data: filteredProducts })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
}


const getLatestProducts = async (req, res) => {
  try {
    let allProducts = [];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Check if user is authenticated
    if (!req.user) {

      const allCategories = await Categories.find({ createdAt: { $gte: thirtyDaysAgo } }).sort({ createdAt: -1 });
      for (const category of allCategories) {
        if (category.product) {
          allProducts.push(...category.product);
        }
      }
      return res.status(200).json({ data: allProducts });
    }

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allCategories = await Categories.find({ createdAt: { $gte: thirtyDaysAgo } }).sort({ createdAt: -1 });

    for (const category of allCategories) {
      if (category.product) {
        allProducts.push(...category.product);
      }
    }

    // Check wishlist
    const filteredProducts = allProducts.map(product => {
      const isWishlisted = user.wishlist.some(wish => wish.title === product.title);
      return { ...product.toObject(), wishlisted: isWishlisted };
    });

    return res.status(200).json({ data: filteredProducts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
}


const getAuthAllProducts = async (req, res) => {
  try {
    let allProducts = [];
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allCategories = await Categories.find({}).sort({ createdAt: -1 });
    for (const category of allCategories) {
      if (category.product) {
        allProducts.push(...category.product);
      }
    }

    // Check wishlist
    const filteredProducts =allProducts && allProducts.length>0 && allProducts.map(product => {
      const isWishlisted = user.wishlist.length>0 && user.wishlist.some(wish => wish.title.toLowerCase() === product.title.toLowerCase());
      return { ...product.toObject(), wishlisted: isWishlisted };
    });

    return res.status(200).json({ data: filteredProducts })
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
}

const getAuthLatestProducts = async (req, res) => {
  try {
    let allProducts = [];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allCategories = await Categories.find({ createdAt: { $gte: thirtyDaysAgo } }).sort({ createdAt: -1 });

    for (const category of allCategories) {
      if (category.product) {
        allProducts.push(...category.product);
      }
    }

    // Check wishlist
    const filteredProducts = allProducts.map(product => {
      const isWishlisted = user.wishlist.some(wish => wish.title.toLowerCase() === product.title.toLowerCase());
      return { ...product.toObject(), wishlisted: isWishlisted };
    });

    return res.status(200).json({ data: filteredProducts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
}

module.exports = {getAllProducts, getLatestProducts,getAuthAllProducts,getAuthLatestProducts };
