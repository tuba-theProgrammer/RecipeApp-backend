const UserSchema = require('../../Model/UserModel/User.model')
const User = UserSchema.User_schema
const ResponseCode = require('../../Utils/Responses/ResponseCode')

const createUser = async (req,res)=>{
   
    console.log("create User Call")
   
    const { device_ID,User_Preferences, User_genere} = req.body
    
    const user= new User({
      device_ID,
        User_Preferences, 
        User_genere
    })
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

    // save User into database

user.save(user)
  .then(data => {
    res.status(200).send({
      data,
      message:"User account created Successfully",
      resCode: ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User.",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
   
}

const CountUsers=async (req,res)=>{
  const Count =await  User.countDocuments()
  res.status(200).send({
     Count,
    message:"Successfull"
  });
}

    
    
    
    const ViewUser = async(req,res)=>{
      const {id} = req.body
      const Data = await User.findById(id)
      if(Data){
      res.status(200).send({
        Data,
        message:"User Found Successfully"
      });
    }else{
      res.status(500).send({
        message:"Error Finding User"
      });
    }
    }




  const UpdateUser = async(req,res)=>{
     const {id,User_Preferences,User_genere} = req.body
     if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    
       if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
          }
    
          User.findByIdAndUpdate(id, {  
            User_Preferences,
            User_genere
        }).then(data=>{
      res.status(200).send({
        message:" User updated successfully",

      });
           
    }).catch(err=>{
        res.status(500).send({
            message:
              err.message || "Some error occurred while updating User"
          });
    })


  }


  const  ViewAllUsers = async (req,res)=>{
     
    const Data =  await User.find();
  console.log(Data)
  res.status(200).send(
    {
        Data,
        message:"User data found successfully"
    }
     ) 
  }


module.exports = {
    createUser,
    ViewUser,
    ViewAllUsers,
    UpdateUser,
    CountUsers
}

