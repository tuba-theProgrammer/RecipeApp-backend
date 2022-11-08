const AdminSchema = require('../../Model/AdminModel/Admin.model')
const Admin = AdminSchema.Admin_schema
const Otp_schema = require('../../Model/OtpModel/Otp.model')
const OTP = Otp_schema.Otp_schema
const { generateOTP } = require('../../Utils/Services/Otp')
const { sendMail } = require('../../Utils/Services/Mail')
const ResponseCode = require('../../Utils/Responses/ResponseCode')
const createAdmin = async (req,res)=>{
   
    console.log("create User Call")
   
    const {AdminEmail,AdminPass,AdminUsername,AdminDisplayName} = req.body
 
    const admin= new Admin({
        AdminEmail,
        AdminPass,
        AdminUsername,
        AdminProfileImage:req.file.path,
        AdminDisplayName
    })

    // save User into database

admin.save(admin)
  .then(data => {
    res.status(200).send({
      data,
      message:"Admin account created Successfully",
      resCode: ResponseCode.ACCOUNT_CREATED_SUCCESSFULLY
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Admin.",
        resCode: ResponseCode.ERROR_MESSAGE
    });
  });
   
   
}


const AdminSignIn= async (req,res)=>{
    console.log("Admin SignIn Call")
    const {AdminUsername,AdminPass}= req.body
   //  Validate request
   if (!AdminUsername) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
      console.log("Admin req body data ",req.body)


       Admin.findOne({
        AdminUsername:AdminUsername
      })
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ 
              message: err,
              resCode: ResponseCode.ERROR_MESSAGE
            });
            return;
          }
    
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
          console.log("here is admin pass ",Admin)

          if(user.AdminPass== AdminPass){
            res.status(200).send({
                user,
                message:"Admin account Login Successfully",
                resCode:ResponseCode.LOGIN_SUCCESSFULL
              
              });
          }else{
            res.status(500).send({
                 
              message:"Incorrect Username and pass",
              resCode: ResponseCode.INCORECT_EMAIL_PASS
            }
               );
          }
          
        });
    }




const Admin_ResetPassword= async(req,res)=>{
  if (!req.body.Email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }  

    let Admindata = await Admin.findOne({AdminEmail:req.body.Email})
   
    const generatedOtp = generateOTP();
    console.log('Generated Otp',generateOTP)
    console.log(Admindata)
    if(Admindata){
            let otpData = new OTP({
            Email:req.body.Email,
            Code: generatedOtp,
            ExpireIn: new Date().getTime() + 300*1000,
            PersonId: Admindata.id
        })
        console.log("user id ",Admindata.id)
         otpData.save(otpData).
         then( data => {
             console.log("OTP data saved successfully")
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while saving the otp"
            });
          });
           
          try {
            await sendMail({
              to:req.body.Email,
              OTP:generatedOtp,
            }).then(data=>{
              res.status(200).send({
                message: 'Please check your email for otp verification',
                resCode: ResponseCode.SUCCESSFULL
              });
            }).catch(err=>{
              res.status(500).send({
                message: 'TimeOut Otp generation, try again later',
                resCode: ResponseCode.FAILED
              });
     

            }

            )

            
             
          } catch (error) {
            res.status(500).send({
                message: 'Unable to Send OTP, Please try again later',
                resCode: ResponseCode.FAILED
              });
     

          }


    }else{
        res.status(500).send({
            message: "Some error occurred while saving the otp"
          });
       

    }

    
}



const Admin_OTPChangePassword= async (req,res)=>{
  
    const {Email,Code,newPass}= req.body
 
    let Otpdata = await OTP.findOne({Email,Code})
    const response={}
     
    if(Otpdata){
       let currentTime = new Date().getTime()
       let diff = Otpdata.expireIn - currentTime
        
       if(diff<0){
        response.message = "Token Expire"
        response.statusText= 'error'

       }else{
        response.message = "Otp receive successfully"
        response.statusText= 'success'
         
        const AdminData = await Admin.findById(Otpdata.PersonId)
        console.log("here is ",AdminData)
        

        Admin.findOneAndUpdate({id:Otpdata.PersonId}, {
            $set:{AdminPass:newPass}
        })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Admin Pass with id=${AdminData.id}. Maybe Admin was not found!`
            });
          } else res.send(
            {
             message1: response.message,
             status: response.statusText,
             message: "Admin pass changes successfully.",
             resCode:ResponseCode.SUCCESSFULL
         
         });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Admin Pass with id=" + AdminData.id,
            resCode:ResponseCode.FAILED
          });
        });

        
       }
      
    }else{
            response.message = "Invalid Otp"
            response.statusText = "error"
        res.status(500).send({
             message:response.message,
             status:response.statusText
          });
     
    }


}


const ChangeWithConfirmPass = async (req,res)=>{
    const response={}
    const {id,OldPass,newPass}= req.body
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      let AdminData = await Admin.find({id,UserPass:OldPass})
    
      if(AdminData){
      Admin.findOneAndUpdate({id:id}, {
        $set:{AdminPass:newPass}
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Admin Pass with id=${AdminData.id}. Maybe Admin was not found!`
        });
      } else res.send(
        {
         message1: response.message,
         status: response.statusText,
         message: "Admin pass changes successfully.",
     
     });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Admin Pass with id=" + AdminData.id
      });
    });
}else{
    res.status(500).send({
        message: "Incorrect Old Password Entered"
      });  
}
    
    
}



const ViewAdminDetails= async(req,res)=>{
  const {id} = req.body
  const Data = await Admin.findById(id)
  if(Data){
  res.status(200).send({
    Data,
    message:"Admin Found Successfully"
  });
}else{
  res.status(500).send({
    message:"Error Finding Admin"
  });
}
}



const updateAdminProfile = async(req,res)=>{
  const {id, 
    AdminEmail,
    AdminDisplayName} = req.body
  if (!req.body) {
   res.status(400).send({ message: "Content can not be empty!" });
   return;
 }
 
    if (!req.body) {
         res.status(400).send({ message: "Content can not be empty!" });
         return;
       }
 
       Admin.findByIdAndUpdate(id, {
        AdminEmail,
        AdminProfileImage:req.file.path,
        AdminDisplayName
     }).then(data=>{
   res.status(200).send({
     message:" Admin data updated successfully",

   });
        
 }).catch(err=>{
     res.status(500).send({
         message:
           err.message || "Some error occurred while updating Admin"
       });
 })


}





module.exports = {
    createAdmin,
    AdminSignIn,
    Admin_ResetPassword,
    Admin_OTPChangePassword,
    ChangeWithConfirmPass,
    ViewAdminDetails,
    updateAdminProfile

}
