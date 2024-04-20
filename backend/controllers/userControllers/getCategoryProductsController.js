const mongoose = require('mongoose');
const User = require('../../database/user/userModel');
const Categories = require('../../database/admin/productModel')

// getting all Category Products when user is not loggedin
const getCategoryProducts = async (req, res) => {
  try {
    const {id}=req.params
      const allProducts = await Categories.findById(id)
      return res.status(200).json({
        data: allProducts
      })
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error" });
  }
}

// getting all Category Products when user is loggedin
const getAuthCategoryProducts = async (req, res) => {
    try {
      const {id}=req.params
        const allProducts = await Categories.findById(id)
        return res.status(200).json({
          data: allProducts
        })
      
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server error" });
    }
  }

module.exports = {getCategoryProducts,getAuthCategoryProducts};
