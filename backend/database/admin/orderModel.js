const mongoose = require("mongoose");

//Orders Schema
const Orders = new mongoose.Schema(
    {
      
        buyer_Name: {
            type: String,
        },
        buyer_Email: {
            type: String,
        },
        buyer_Phone: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        size: {
            type: String
        },
        color: {
            type: String
        },
        payemnt_Type:{
            type: String,
        },
        payment_Status:{
            type: String,
        },
        address:{
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
        }
    },
    { timestamps: true }
);

module.exports = Orders;
