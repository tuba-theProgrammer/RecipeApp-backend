const mongoose = require("mongoose");

const OtpSchema=new mongoose.Schema({
   
    PersonId:{
        type:String,
        required:true
    },
    Email: {
        type:String,
        required:true
    },

    Code:{
        type:String,
        required:true
    },
    ExpireIn:{
        type:Date, 
        required:true
    }

})


const Otp_schema = mongoose.model("Otps", OtpSchema);
module.exports={ Otp_schema}
