const mongoose = require("mongoose");

//SecurityCode Schema
const SecurityCodeSchema = new mongoose.Schema(
    {
      
        code: {
            type: String,
        }
    },
    { timestamps: true }
);
const SecurityCode = mongoose.model('security', SecurityCodeSchema)

module.exports = SecurityCode;
