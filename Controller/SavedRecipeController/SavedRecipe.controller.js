const RecipeSchema = require('../../Model/SavedRecipeModel/SavedRecipe.model')
const Recipe = RecipeSchema.SavedRecipe_schema
const ResponseCode = require('../../Utils/Responses/ResponseCode')

const SaveRecipe = async(req,res)=>{
      
    const {
       Recipe_ID} = req.body
    
        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }

     const SearchExistingRecipe= await Recipe.findOne({Recipe_ID})
    if(SearchExistingRecipe){
      res.status(400).send({
        message:"Error Recipe is already saved in Database",
        resCode:ResponseCode.ERROR_MESSAGE
      });
      console.log(SearchExistingRecipe)
    }else{
   
    const recipe= new Recipe({
        Recipe_ID
    })
 
    // save User into database

recipe.save(recipe)
  .then(data => {
    res.status(200).send({
        message:"Recipe saved Successfully",
        resCode:ResponseCode.DATA_ADDED_SUCCESSFULLY
      });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Recipe.",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
}
}

const DeleteSaveRecipe=(req,res)=>{
  const {id} = req.body;
  console.log(id)
   
  if (!req.body.id) {
      res.status(400).send({ message: "saved recipe Id required to delete data" });
      return;
    }


  Recipe.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Saved Recipe with id=${id}. Maybe Recipe was not found!`
        });
      } else {
        res.send({
          message: "Saved Recipe deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete saved Recipe with id=" + id
      });
    });
}



const ViewAllSavedRecipe = async (req,res)=>{
    const Data =  await Recipe.find();
    console.log(Data)
    res.status(200).send(
      {
          Data,
          message:"Recipe data found successfully"
      }
       ) 
}

module.exports={
  SaveRecipe,
  ViewAllSavedRecipe,
  DeleteSaveRecipe } 