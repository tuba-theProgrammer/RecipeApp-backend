const mongoose = require("mongoose");

const IngredientsSchema=new mongoose.Schema({

    Item_Name:{
        type:String,
        required:true,
       },

    Item_quantity:{
        type:String,
        required:true,
       },
    
   },{

    timestamps:true
}
)

IngredientsSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const Ingredients_schema = mongoose.model("Ingredients", IngredientsSchema);
module.exports={ Ingredients_schema}

