const mongoose = require("mongoose");
const User = require("./user")
const Actions = require("./actions")
const Company = require("./company")

const campaignSchema = new mongoose.Schema({
    // creater:{ 
    //     type:  mongoose.Schema.Types.ObjectId,
    //     ref: 'User' 
    // },
    company:{ 
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    campaign_type:{
        type:String,
    },
    thematic:{
        type:String,
        require:true
    },
    start_date:Date,
    week:{
        type:String
    },
    year:{
        type:String
    },
    month:{
        type:String
    },
    end_date:Date,
    isComplete:{
        type:Boolean,
        default:false
    },
    note:String,
    actions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Actions'
    }]


});

const Campaign = mongoose.model("Campaign",campaignSchema);
module.exports = Campaign;