const mongoose = require('mongoose')
const Wishlist=new mongoose.Schema({
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
       
      },
      images: [{
        imageUrl:{
          type: String,
        }
      }
       ],
      price: {
        type: Number,
      
      },
      soldQuantity: {
        type: Number,
        default:0
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
      description: {
        type: String,
      
      },
}, { timestamps: true })

module.exports = Wishlist;
