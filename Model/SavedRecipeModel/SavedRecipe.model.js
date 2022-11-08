const mongoose = require("mongoose");

const SavedRecipesSchema=new mongoose.Schema({
       
       Recipe_ID:{
        type:String,
        required:true,
       },
     

},{

    timestamps:true
}
)

SavedRecipesSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

const SavedRecipe_schema = mongoose.model("SavedRecipes", SavedRecipesSchema);
module.exports={ SavedRecipe_schema}

