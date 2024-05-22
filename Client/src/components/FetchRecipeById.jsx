
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom'; 
import { VITE_BACKEND_URL } from "../App";
import "./FetchRecipeById.css"; // Import custom CSS file for styling

const FetchRecipeById = ({ id }) => {
  const [recipe, setRecipe] = useState(null);
  const location = useLocation(); // Hook to get the current location

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const api = await axios.get(`${VITE_BACKEND_URL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setRecipe(api.data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-details-container text-center">
      <div className="recipe-image-container">
        <img
          src={recipe.imgurl}
          className="recipe-image"
          alt={recipe.title}
        />
      </div>
      <h3>{recipe.title}</h3>
      {location.pathname !== "/saved" && (
        <div className="recipe-info-container">
          <div className="recipe-ingredients">
            <h4>{recipe.ing1} - {recipe.qty1}</h4>
            <h4>{recipe.ing2} - {recipe.qty2}</h4>
            <h4>{recipe.ing3} - {recipe.qty3}</h4>
            <h4>{recipe.ing4} - {recipe.qty4}</h4>
          </div>
          <div className="recipe-instructions" style={{ maxWidth: "500px" }}>
            {recipe.ist}
          </div>
          <Link to={"/"} className="btn btn-warning my-5">
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default FetchRecipeById;
