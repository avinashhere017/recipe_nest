
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from 'react-router-dom'; 
import { VITE_BACKEND_URL} from "../App"
 
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
    <div className="text-center">
      <div
        className="text-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="d-flex justify-content-center align-items-center p-3">
          <img
            src={recipe.imgurl}
            className="card-img-top"
            alt="..."
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "10px",
              border: "2px solid yellow",
            }}
          />
        </div>
        <h3>{recipe.title}</h3>
      </div>
      {location.pathname !== "/saved" && (
        <>
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div className="left">
              <h4>{recipe.ing1} - {recipe.qty1}</h4>
              <h4>{recipe.ing2} - {recipe.qty2}</h4>
              <h4>{recipe.ing3} - {recipe.qty3}</h4>
              <h4>{recipe.ing4} - {recipe.qty4}</h4>
            </div>
            <div className="right" style={{ maxWidth: "500px" }}>
              {recipe.ist}
            </div>
          </div>
          <Link to={"/"} className="btn btn-warning my-5">
            Back to Home
          </Link>
        </>
      )}
    </div>
  );
};

export default FetchRecipeById;
