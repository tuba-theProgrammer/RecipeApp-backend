const express= require('express')
const app= express()
const  middleware  = require('../Middleware/FileUpload.middleware')
const upload = middleware.upload
const RecipeController = require('../../Controller/RecipesController/Recipes.controller')
app.post('/CreateRecipe',upload.fields([{ name: 'RecipeImage', maxCount: 3 }, { name: 'RecipeVideo', maxCount: 3 }]),RecipeController.CreateRecipe)
app.post('/UpdateRecipe',upload.fields([{ name: 'RecipeImage', maxCount: 3 }, { name: 'RecipeVideo', maxCount: 3 }]),RecipeController.UpdateRecipe)
app.post('/DeleteRecipe',RecipeController.DeleteRecipe)
app.get('/ViewAllRecipe',RecipeController.ViewAllRecipe)
app.post('/ViewRecipe',RecipeController.ViewRecipe)
app.get('/CountRecipe',RecipeController.CountRecipes)
module.exports= app