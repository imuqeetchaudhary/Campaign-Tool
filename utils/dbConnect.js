const mongoose = require("mongoose");

module.exports = async ()=>{
   try{
    const connetion = await mongoose.connect(
        "mongodb://localhost:27017/campaign-tool",
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
    );
    console.log("DB is connected sucessfully....");
   }
   catch(err){
    console.log("error occurs while connecting to db", err);
   }
}