
import mongoose from "mongoose";

const savedRecipeSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'recipe',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  }
});

export const SavedRecipe = mongoose.model("SavedRecipe", savedRecipeSchema);
