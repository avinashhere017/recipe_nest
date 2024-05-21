import {Recipe} from '../Models/Recipe.js'
import {SavedRecipe} from '../Models/SavedRecipe.js'

export const add = async (req,res)=>{
    const { title, ist, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4,imgurl } =
      req.body;
      try {
        const recipe = await Recipe.create({
          title,
          ist,
          ing1,
          ing2,
          ing3,
          ing4,
          qty1,
          qty2,
          qty3,
          qty4,
          imgurl,
          user: req.user,
        });

        res.json({message:"Recipe Created Successfully..!",recipe})
      } catch (error) {
        res.json({message:error})
      }
} 


export const getAllRecipe = async (req,res) =>{
    const recipe = await Recipe.find();
    res.json({recipe}) 
}


export const getRecipeById = async (req,res)=>{
    const id = req.params.id
    try { 
        let recipe = await Recipe.findById(id)

        if(!recipe) res.json({message:'recipe not exist'})

        res.json({message:"recipe by id", recipe})
        
    } catch (error) {
        res.json({message:error})
    }
}

export const getRecipeByUserId = async (req,res) =>{
 const userId = req.params.id;
 try {
   let recipe = await Recipe.find({user:userId});

   if (!recipe) res.json({ message: "recipe not exist" });

   res.json({ message: "recipe by userId", recipe });
 } catch (error) {
   res.json({ message: error });
 }
}


export const savedRecipeById = async (req, res) => {
  const id = req.params.id;

  try {
    // Check if the recipe is already saved
    const existingSavedRecipe = await SavedRecipe.findOne({ recipe: id, user: req.user._id });

    if (existingSavedRecipe) {
      return res.json({ message: "Recipe already saved" });
    }

    // If not saved already, save the recipe
    const newSavedRecipe = await SavedRecipe.create({ recipe: id, user: req.user._id });

    res.status(201).json({ message: "Recipe saved successfully", savedRecipe: newSavedRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSavedRecipe = async (req, res) => {
  try {
    const recipes = await SavedRecipe.find({ user: req.user._id }).populate('recipe');
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, imgurl } = req.body;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, { title, imgurl }, { new: true });
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error updating recipe', error });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
};

// controllers/recipe.js

export const removeSavedRecipe = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedRecipe = await SavedRecipe.findOneAndDelete({ recipe: id, user: req.user._id });
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Saved recipe not found' });
    }
    res.json({ message: 'Recipe removed from saved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
