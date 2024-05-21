
import express from 'express';
import { register, login, profile, logout } from '../controllers/user.js';
import { Authenticate } from '../middlewares/auth.js';
import { updateRecipe, deleteRecipe } from '../controllers/recipe.js';

const router = express.Router();

// User routes
router.post('/register', register);
router.post('/login', login);
router.get('/user', Authenticate, profile);
router.post('/logout', logout);

// Recipe routes
router.put('/update/:id', Authenticate, updateRecipe);
router.delete('/delete/:id', Authenticate, deleteRecipe);

export default router;
