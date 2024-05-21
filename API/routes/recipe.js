
import express from 'express';
import { add, getAllRecipe, getRecipeById, getRecipeByUserId, getSavedRecipe, savedRecipeById, updateRecipe, deleteRecipe, removeSavedRecipe } from '../controllers/recipe.js';
import { Authenticate } from '../middlewares/auth.js';
const router = express.Router();

// Create recipe
router.post('/add', Authenticate, add);

// Get all recipes
router.get('/', getAllRecipe);

// Get all saved recipes for the authenticated user
router.get('/saved', Authenticate, getSavedRecipe);

// Get recipe by Id
router.get('/:id', getRecipeById);

// Get recipe by userId
router.get('/user/:id', getRecipeByUserId);

// Save recipe by Id for the authenticated user
router.post('/:id', Authenticate, savedRecipeById);

// Update recipe
router.put('/update/:id', Authenticate, updateRecipe);

// Delete recipe
router.delete('/delete/:id', Authenticate, deleteRecipe);

// Remove saved recipe
router.delete('/saved/:id', Authenticate, removeSavedRecipe);

export default router;
