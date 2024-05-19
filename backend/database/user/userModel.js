const mongoose = require('mongoose')
const Orders=require('./userOrderModel')
const Wishlist=require('./wishListModel')
const Notifications =require('./Notifications')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    originalPassword:{
        type:String,
    },
    orders:[Orders],
    wishlist:[Wishlist],
    notifications:[Notifications]

},{timestamps:true})

const User = mongoose.model('user', userSchema)
module.exports = User