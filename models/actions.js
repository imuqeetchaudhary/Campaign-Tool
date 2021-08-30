const mongoose = require("mongoose");
const Channel = require("../models/channel")


const actionSchema = new mongoose.Schema({
    action_type:{
        type:String,
    },
    target:{
        type:String,
    },
    channels:[{
        type:  mongoose.Schema.Types.ObjectId,
        ref:'Channel'
    }]
});

const Action = new mongoose.model("Action",actionSchema)
module.exports = Action