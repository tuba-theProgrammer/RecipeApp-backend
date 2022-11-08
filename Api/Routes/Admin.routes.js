const express= require('express')
const app= express()
const  middleware  = require('../Middleware/FileUpload.middleware')
const upload = middleware.upload

const AdminController = require('../../Controller/AdminController/Admin.controller')
app.post('/CreateAdmin',upload.single('admin_profileImage'),AdminController.createAdmin)
app.post('/LoginAdmin',AdminController.AdminSignIn)
app.post('/AdminChangeOTPPass',AdminController.Admin_OTPChangePassword)
app.post('/AdminResetPass',AdminController.Admin_ResetPassword)
app.post('/ChangeWithConfirmPass',AdminController.ChangeWithConfirmPass)
app.post('/ViewAdmin',AdminController.ViewAdminDetails)
app.post('/UpdateAdmin',upload.single('admin_profileImage'),AdminController.updateAdminProfile)

 module.exports= app