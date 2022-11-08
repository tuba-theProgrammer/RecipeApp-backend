const express= require('express')
const app= express()

const UserController = require('../../Controller/LogDetailsController/LogDetails.controller')
app.post('/CreateLogUser',UserController.createLogUser)
app.post('/LoginLogUser',UserController.LogUserSignIn)
app.post('/UpdateLogUserProfile',UserController.UpdateLogUserProfile)
app.post('/UpdateLogUserPass',UserController.UpdateUserPass)
app.post('/DeleteLogUser',UserController.DeleteLoginDetailsAccount)
app.get('/ViewAllLogs',UserController.ViewAllLogs)
module.exports= app