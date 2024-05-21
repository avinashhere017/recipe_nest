
import React, { useContext } from "react";
import { AppContext } from "../context/App_Context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const { recipe, savedRecipeById } = useContext(AppContext);

  const saved = async (id) => {
    const result = await savedRecipeById(id);
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
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row">
          {recipe.map((data) => (
            <div key={data._id} className="col-lg-3 col-md-4 col-sm-6 my-3">
              <div className="card bg-dark text-light h-100">
                <div className="d-flex justify-content-center align-items-center p-3">
                  <img
                    src={data.imgurl}
                    className="card-img-top"
                    alt={data.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      borderRadius: "10px",
                      border: "2px solid yellow",
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                  <div className="my-3 d-flex justify-content-around">
                    <button className="btn btn-primary" onClick={() => saved(data._id)}>Save</button>
                    <button className="btn btn-warning" onClick={() => navigate(`/${data._id}`)}>View More</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
