const mongoose = require("mongoose");

const AdminSchema=new mongoose.Schema({

       AdminEmail:{
        type:String,
        required:true,
       },
    
       AdminPass:{
        type:String,
        required:true,
       },

       AdminUsername:{
        type:String,
        required:true,
       },

       AdminProfileImage:{
        type:String,
        required:true,
       },

       AdminDisplayName:{
        type:String,
        required:true,
       }

}
)

AdminSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Admin_schema = mongoose.model("Admin", AdminSchema);
module.exports={ Admin_schema}

