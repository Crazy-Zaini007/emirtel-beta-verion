const mongoose = require('mongoose');
const User = require('../../database/user/userModel');
const Categories = require('../../database/admin/productModel')

// getting all Categories
const getCategories = async (req, res) => {
  try {
      const allCategories = await Categories.find({}).sort({ createdAt: -1 })
      return res.status(200).json({
        data: allCategories
      })
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server error" });
  }
}

module.exports = {getCategories};
