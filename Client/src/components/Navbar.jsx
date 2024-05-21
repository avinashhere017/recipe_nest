

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/App_Context";

const Navbar = () => {
  const { isAuthenticated, logOut } = useContext(AppContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logOut();
    navigate("/");  // Redirect to home after logout
  };

  return (
    <div className="nav bg-dark p-2">
      <Link to={"/"} className="left" style={{ textDecoration: "none", color: "white" }}>
        <h2>Recipe Nest</h2>
      </Link>
      <div className="right">
        {isAuthenticated ? (
          <>
            <Link to={"/"} className="btn btn-info mx-2">Home</Link>
            <Link to={"/add"} className="btn btn-info mx-2">Add Recipe</Link>
            <Link to={"/profile"} className="btn btn-warning mx-2">Profile</Link>
            <div className="btn btn-danger mx-2" onClick={handleLogout}>LogOut</div>
            <Link to={"/saved"} className="btn btn-light mx-2">Saved</Link>
          </>
        ) : (
          <>
            <Link to={"/"} className="btn btn-info mx-2">Home</Link>
            <Link to={"/login"} className="btn btn-primary mx-2">Login</Link>
            <Link to={"/register"} className="btn btn-warning mx-2">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
