const mongoose = require("mongoose");

//Content Schema
const pageContentSchema = new mongoose.Schema(
    {
        images:[]
    }
);
const Contents = mongoose.model('content', pageContentSchema)
module.exports = Contents;
