const express= require('express')
const app= express()

const IngredientController = require('../../Controller/IngredientsController/Ingredients.controller')
app.post('/CreateIngredient',IngredientController.CreateIngredients)
app.post('/UpdateIngredients',IngredientController.UpdateIngredient)
app.post('/DeleteIngredient',IngredientController.RemoveIngredients)
app.get('/ViewAllIngredients',IngredientController.ViewAllIngredients)
app.post('/ViewCategory',IngredientController.ViewIngredient)
module.exports= app