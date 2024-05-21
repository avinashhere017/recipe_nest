
  import React, { useEffect, useState } from "react";
  import { AppContext } from "./App_Context";
  import axios from "axios";
  import { VITE_BACKEND_URL} from "../App";

  const App_State = (props) => {
    const url = `${VITE_BACKEND_URL}`;
    const [token, setToken] = useState("");
    const [recipe, setRecipe] = useState([]);
    const [savedRecipe, setSavedRecipe] = useState([]);
    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState("");
    const [userRecipe, setUserRecipe] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [reload, setReload] = useState(true);


    


    useEffect(() => {
      const fetchRecipe = async () => {
        const api = await axios.get(`${url}/`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setRecipe(api.data.recipe);
      };
      fetchRecipe();
      getSavedRecipeById();
      profile();
      recipeByUser(userId);
    }, [token, userId, reload]);

    useEffect(() => {
      if (token) {
        localStorage.setItem("token", token);
      }
      const tokenFromLocalStorage = localStorage.getItem("token");
      if (tokenFromLocalStorage) {
        setToken(tokenFromLocalStorage);
        setIsAuthenticated(true);
      }
    }, [token, reload]);

    const register = async (name, gmail, password) => {
      const api = await axios.post(
        `${url}/register`,
        { name, gmail, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return api;
    };

    const login = async (gmail, password) => {
      const api = await axios.post(
        `${url}/login`,
        {
          gmail,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setToken(api.data.token);
      setIsAuthenticated(true);
      return api;
    };

    const addRecipe = async (
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
      imgurl
    ) => {
      const api = await axios.post(
        `${url}/add`,
        {
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
        },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      return api;
    };

    const deleteRecipe = async (id) => {
      try {
        await axios.delete(`${url}/delete/${id}`, {
          headers: { Auth: token },
        });
        setReload(!reload);
      } catch (error) {
        console.error('Error deleting recipe:', error);
      }
    };

    const updateRecipe = async (id, updatedData) => {
      try {
        await axios.put(`${url}/update/${id}`, updatedData, {
          headers: { 'Content-Type': 'application/json', Auth: token },
        });
        setReload(!reload);
      } catch (error) {
        console.error('Error updating recipe:', error);
      }
    };

    const getRecipeById = async (id) => {
      const api = await axios.get(`${url}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return api;
    };

    const savedRecipeById = async (id) => {
      const api = await axios.post(
        `${url}/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      return api;
    };

    const getSavedRecipeById = async () => {
      try {
        const api = await axios.get(`${url}/saved`, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        setSavedRecipe(api.data.recipes);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    const profile = async () => {
      const api = await axios.get(`${url}/user`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      setUserId(api.data.user._id);
      setUser(api.data.user);
    };

    const recipeByUser = async (id) => {
      const api = await axios.get(`${url}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setUserRecipe(api.data.recipe);
    };

    const logOut = () => {
      localStorage.removeItem("token");
      setToken("");
      setIsAuthenticated(false);
    };

    const removeSavedRecipe = async (id) => {
      try {
        await axios.delete(`${url}/saved/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        setReload(!reload);
      } catch (error) {
        console.error("Error removing saved recipe:", error);
      }
    };

    return (
      <AppContext.Provider
        value={{
          login,
          register,
          addRecipe,
          recipe,
          getRecipeById,
          savedRecipeById,
          savedRecipe,
          userRecipe,
          user,
          logOut,
          isAuthenticated,
          deleteRecipe,
          updateRecipe,
          removeSavedRecipe, // Add this line
        }}
      >
        {props.children}
      </AppContext.Provider>
    );
  };

  export default App_State;
