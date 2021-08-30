const mongoose = require("mongoose");
const User = require("./user")
const companySchema = new mongoose.Schema({
    company:{
        type:String
    },
    creater:{ 
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    userAccess:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
})

const Company = mongoose.model("Company",companySchema)
module.exports = Company