const CategorySchema = require('../../Model/CategoriesModel/Categories.model')
const Category =CategorySchema.Categories_schema
const ResponseCode = require('../../Utils/Responses/ResponseCode')

const CreateCategory = (req,res)=>{
      
    const {
        Category_name,
        Recipe_Country,
        Recipe_type} = req.body
    
        if (!req.body.Category_name) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }


    const category= new Category({
        Category_name,
        Recipe_Country,
        Recipe_type
    })

    

    // save category into database

category.save(category)
  .then(data => {
    res.status(200).send({
          data,
          message:"Category Data added successfully",
          resCode: ResponseCode.DATA_ADDED_SUCCESSFULLY
      });

  
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the category",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
}


const DeleteCategory =(req,res)=>{
    const {id} = req.body;
    console.log(id)
     
    if (!req.body.id) {
        res.status(400).send({ message: "Category Id required to delete data" });
        return;
      }


    Category.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
          });
        } else {
          res.send({
            message: "Category deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Category with id=" + id
        });
      });
}


const UpdateCategory = (req,res)=>{
    const {
        id,
        Category_name,
        Recipe_Country,
        Recipe_type
    }  = req.body

        if(!req.body){
            res.status(400).send({ message: "No Data Found To Update" });
            return;
        }

        Category.findByIdAndUpdate(id, {
            Category_name,
            Recipe_Country,
            Recipe_type
        }).then(data=>{
      res.status(200).send({
        message:" Category updated successfully",

      });
          
    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating category"
          });
    })
}


const ViewAllCategories =async (req,res)=>{
   
    const Data =  await Category.find();
  console.log(Data)
  res.status(200).send(
    {
        Data,
        message:"Category data found successfully"
    }
     ) 
}


const ViewCategory =async (req,res)=>{
    const {id} = req.body
    const Data = await Category.findById(id)
    if(Data){
    res.status(200).send({
      Data,
      message:"Category Found Successfully"
    });
  }else{
    res.status(500).send({
      message:"Error Finding Category"
    });
  }
}

const CountCategories=async (req,res)=>{
  const Count =await  Category.countDocuments()
  res.status(200).send({
     Count,
    message:"Successfull"
  });
}



module.exports = {
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
  ViewAllCategories,
  ViewCategory,
  CountCategories
}