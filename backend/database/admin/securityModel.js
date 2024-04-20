const mongoose = require("mongoose");

//Notifications Schema
const SecuritySchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required:true
        }
    }
);
const Security = mongoose.model('security', SecuritySchema)

module.exports = Security;
