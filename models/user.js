const mongoose = require("mongoose");
const Company = require("./company")

const userSchema = new mongoose.Schema({
   username: {type: String, require: true, unique: true},
   password: {
       type: String, 
       require: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isMember:{
        type:Boolean,
        default:false,
    },
    company: { 
            type: String
    },
    companyAccess:[{
        type: String
    }]
    
});

const User = mongoose.model("User",userSchema);
module.exports = User;