const mongoose = require("mongoose");

const LogDetailsSchema=new mongoose.Schema({

   LogUser_ID:{
    type:String,
    required:true,
   },
   LogUsername:{
    type:String,
    required:true,
   },
   
   Log_UserPass:{
    type:String,
    required:true,
   },

   Log_UserTable:{
    type:String,
    required:true,
   },

   User_Location:{
    type:String,
    required:true,
   },

    
   },{

    timestamps:true
}
)

LogDetailsSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const LogDetails_schema = mongoose.model("LogDetails",LogDetailsSchema);
module.exports={ LogDetails_schema}

