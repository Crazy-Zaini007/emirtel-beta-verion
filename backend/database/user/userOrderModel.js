const mongoose = require("mongoose");

//MyOrders Schema
const MyOrders = new mongoose.Schema(
    {
        orderId:{
            type: String,
        },
        totalPrice: {
            type: Number,
             required: true,
        },
        totalQuantity: {
            type: Number,
            required: true,
        },
        payment_Type:{
            type: String,
        },
        payment_Status:{
            type: String,
        },
        address:{
            type: String,
        },
        city:{
            type: String,

        },
        buyer_Phone:{
            type: String,
        },
        buyer_Name:{
            type: String,
        },
        buyer_Email:{
            type: String,
        },
        order_Status: {
            type: String,
            default: "Pending"
        },
        date:{
            type: String,
        },
        month:{
            type: String,
        },
        year:{
            type: String,
        },
        time:{
            type: String,

        },
        products:[
            {
                productId:{
                    type: String,
                },
                sellerId:{
                    type: String,
                },
                title:{
                    type: String,
                },
                quantity:{
                    type: String,
                },
                price:{
                    type:Number
                },
                totalPrice:{
                    type:Number
                }
            }
        ]
    },
    { timestamps: true }
);

module.exports = MyOrders;
