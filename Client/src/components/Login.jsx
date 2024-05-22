import React, { useContext, useState } from "react";
import { AppContext } from "../context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await login(gmail, password);
      if (result.status === 200) {
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container my-5 p-5" style={containerStyle}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={loginHandler} className="my-3 p-3" style={formStyle}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary my-3">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const containerStyle = {
  maxWidth: '100%',
  border: '2px solid yellow',
  borderRadius: '10px',
  width: '90%',
  maxWidth: '500px',
  margin: 'auto',
};

const formStyle = {
  maxWidth: '100%',
  margin: 'auto',
};

export default Login;
