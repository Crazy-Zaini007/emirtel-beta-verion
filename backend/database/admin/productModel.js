const mongoose = require("mongoose");

// Define a schema for individual products
const ProductItemSchema = new mongoose.Schema({
  sellerId: {
    type: String,
  },
  categoryName: {
    type: String
  },
  sellerName: {
    type: String,
  },
  title: {
    type: String,
    default:''
  },
  images: [{
    imageUrl: {
      type: String,
    }
  }],
  price: {
    type: Number,
    default:0,
  },
  quantity: {
    type: Number,
    default:0,
  },
  size: {
    type: [String]
  },
  color: {
    type: [String]
  },
  status: {
    type: Boolean,
    default: true
  },
  available: {
    type: Boolean,
    default: true
  },
  product_Rating: [{
    buyerId: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0
    }
  }],
  soldQuantity: {
    type: Number
  },
  description: {
    type: String,
    default:''
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  keywords: {
    type: [String]
  },
  date: {
    type: String
  }
}, { timestamps: true }); 

// Products Schema
const ProductSchema = new mongoose.Schema({
  categoryName: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  des_Pic:{
    type: String,
    default:''
  },
  product: [ProductItemSchema]
}, { timestamps: true }); 

const Products = mongoose.model('products', ProductSchema);

module.exports = Products;
