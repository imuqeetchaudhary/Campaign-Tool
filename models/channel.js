const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
    channel_type:{
        type:String
    },
    cost:Number,
    volumn:Number,
})

const Channel = mongoose.model("Channel",channelSchema)
module.exports = Channel