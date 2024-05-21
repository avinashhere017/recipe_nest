import React, { useContext } from "react";
import { AppContext } from "../context/App_Context";
import FetchRecipeById from "./FetchRecipeById";

const Saved = () => {
  const { savedRecipe, removeSavedRecipe } = useContext(AppContext);
  console.log('Saved Recipes:', savedRecipe);

  return (
    <div className="container my-3">
      <div className="row">
        {savedRecipe?.length > 0 ? (
          savedRecipe.map((data) => (
            data.recipe && ( // Check if recipe is not null
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={data.recipe._id}>
                <div className="card h-100">
                  <FetchRecipeById id={data.recipe._id} />
                  <div className="card-body d-flex flex-column">
                    <button 
                      className="btn btn-danger mt-auto"
                      onClick={() => removeSavedRecipe(data.recipe._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          ))
        ) : null}
        {savedRecipe?.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center" role="alert">
              No saved items found. Save a recipe of your choice!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;

