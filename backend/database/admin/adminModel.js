const mongoose = require('mongoose')
const Orders=require('./orderModel')
const Notifications =require('./notificationsModel')
const adminSchema = new mongoose.Schema({

    userName: {
    type:String,
    required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role: {
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    password: {
        type:String,
        required:true
    },
    originalPassword:{
        type:String,
    },
    orders:[Orders],
    notifications:[Notifications]

},{timestamps:true})

const Admin = mongoose.model('admin', adminSchema)
module.exports = Admin