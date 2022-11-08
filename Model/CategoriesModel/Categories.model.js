const mongoose = require("mongoose");

const CategoriesSchema=new mongoose.Schema({

    
       Category_name:{
        type:String,
        required:true,
       },

        Recipe_Country:{
        type:String,
        required:true,
       },

        Recipe_type:{
        type:String,
        required:true,
       },


},{

    timestamps:true
}
)

CategoriesSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Categories_schema = mongoose.model("Categories", CategoriesSchema);
module.exports={ Categories_schema}

