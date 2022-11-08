const express= require('express')
const app= express()

const UserController = require('../../Controller/UsersController/Users.controller')
app.post('/CreateUser',UserController.createUser)
app.post('/ViewUser',UserController.ViewUser)
app.get('/ViewAllUsers',UserController.ViewAllUsers)
app.post('/UpdateUser',UserController.UpdateUser)
app.get('/CountUser',UserController.CountUsers)
module.exports= app