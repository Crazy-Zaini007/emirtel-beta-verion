const mongoose = require("mongoose");

//Notifications Schema
const Notifications = new mongoose.Schema(
    {
      
        type: {
            type: String,
        },
        content:{
            type:String
        },
        new:{
            type:Boolean,
            default:true
        },
        date:{
            type:String
        }
    },
    { timestamps: true }
);

module.exports = Notifications;
