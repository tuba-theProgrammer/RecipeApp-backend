const mongoose = require("mongoose");

const UserSchema=new mongoose.Schema({
    
    device_ID:{
        type:String,
        required:true,
    },
   

    User_Preferences:{
        type:String,
        required:true,
       },

    User_genere:{
        type:String,
        required:true,
       },


}
)

UserSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const User_schema = mongoose.model("Users", UserSchema);
module.exports={ User_schema}

