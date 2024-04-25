const mongoose = require("mongoose");

//allOrders Schema
const allOrdersSchema = new mongoose.Schema(
    {
        orderId:{
            type: String,
        },
        buyer_Name: {
            type: String,
        },
        buyer_Email: {
            type: String,
        },
        buyer_Phone: {
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
        address:{
            type: String,
        },
        city:{
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

const AllOrders = mongoose.model('allOrders', allOrdersSchema)

module.exports = AllOrders;
