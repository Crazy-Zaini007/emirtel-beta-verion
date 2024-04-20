const mongoose = require('mongoose')
const MyOrders=new mongoose.Schema({
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
        required: true,
      },
      images: [{
        imageUrl:{
          type: String,
        }
      }
       ],
      pricePerItem: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      payment_Via:{
        type: String
      },
      quantity:{
        type: Number,
        required: true,
      },
      size: {
        type: [String]
      },
      color: {
        type: String
      },
      status: {
        type: Boolean,
        default: true
      },
      description: {
        type: String,
        required: true,
      },
}, { timestamps: true })

module.exports = MyOrders;
