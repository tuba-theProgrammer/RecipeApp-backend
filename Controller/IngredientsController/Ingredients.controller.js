const IngredientsSchema = require('../../Model/IngredientsModel/Ingredients.model')
const Ingredients = IngredientsSchema.Ingredients_schema
const ResponseCode = require('../../Utils/Responses/ResponseCode')


const CreateIngredients= async(req,res)=>{
    console.log("create Ingredients Call")
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    const { Item_Name,Item_quantity} = req.body
    
    const ingredients= new Ingredients({
        Item_Name,Item_quantity
    })
  
    // save User into database

ingredients.save(ingredients)
  .then(data => {
    res.status(200).send({
      data,
      message:"Ingredients created Successfully",
      resCode: ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Ingredients",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
  

}


const RemoveIngredients= async(req,res)=>{
    const {id} = req.body;
  console.log(id)
   
  if (!req.body.id) {
      res.status(400).send({ message: "Ingredients Id required to delete data" });
      return;
    }


  Ingredients.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Ingredients with id=${id}. Maybe Ingredients was not found!`
        });
      } else {
        res.send({
          message: "Ingredients deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Ingredients with id=" + id
      });
    });
}


const ViewIngredient= async(req,res)=>{
    const {id} = req.body
    const Data = await Ingredients.findById(id)
    if(Data){
    res.status(200).send({
      Data,
      message:"Ingredient Found Successfully"
    });
  }else{
    res.status(500).send({
      message:"Error Finding Ingredient"
    });
  }
}

const UpdateIngredient= async(req,res)=>{
    const {
        id,
        Item_Name,
        Item_quantity
    }  = req.body

        if(!req.body){
            res.status(400).send({ message: "No Data Found To Update" });
            return;
        }

        Ingredients.findByIdAndUpdate(id, {
            Item_Name,
            Item_quantity
        }).then(data=>{
      res.status(200).send({
        message:" Ingredients updated successfully",

      });
          
    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating Ingredients"
          });
    })
}


const ViewAllIngredients=async(req,res)=>{
    const Data =  await Ingredients.find();
    console.log(Data)
    res.status(200).send(
      {
          Data,
          message:"Ingredients data found successfully"
      }
       ) 
}

module.exports = {
    CreateIngredients,
    RemoveIngredients,
    UpdateIngredient,
    ViewIngredient,
    ViewAllIngredients }