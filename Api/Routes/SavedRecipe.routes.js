const express= require('express')
const app= express()

const RecipeController = require('../../Controller/SavedRecipeController/SavedRecipe.controller')
app.post('/SaveRecipe',RecipeController.SaveRecipe)
app.get('/ViewAllSavedRecipe',RecipeController.ViewAllSavedRecipe)
app.post('/DeleteSaveRecipe',RecipeController.DeleteSaveRecipe)
module.exports= app