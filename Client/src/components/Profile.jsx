
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/App_Context';

const Profile = () => {
  const { user, userRecipe, deleteRecipe, updateRecipe } = useContext(AppContext);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({ title: '', imgurl: '' });

  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleUpdate = (recipe) => {
    setEditMode(recipe._id);
    setFormData({ title: recipe.title, imgurl: recipe.imgurl });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      await updateRecipe(id, formData);
      setEditMode(null);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <>
      <div className="container text-center my-3">
        <h1>Welcome, {user.name}</h1>
        <h2>{user.gmail}</h2>
      </div>
      <div className="container">
        <div className="text-center mx-auto">
          <h2>The recipes added by {user.name} are shown here.</h2>
          {!userRecipe.length ? (
            <p>Please add a recipe to contribute to the community.</p>
          ) : (
            <div className="row d-flex justify-content-center align-items-center">
              {userRecipe.map((data) => (
                <div key={data._id} className="col-12 col-sm-6 col-md-4 col-lg-3 my-3">
                  {editMode === data._id ? (
                    <div className="card">
                      <div className="card-body">
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="form-control mb-2"
                        />
                        <input
                          type="text"
                          name="imgurl"
                          value={formData.imgurl}
                          onChange={handleChange}
                          className="form-control mb-2"
                        />
                        <button onClick={() => handleSave(data._id)} className="btn btn-success me-2">
                          Save
                        </button>
                        <button onClick={() => setEditMode(null)} className="btn btn-secondary">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="card">
                      <img
                        src={data.imgurl}
                        className="card-img-top img-fluid"
                        alt={data.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '10px',
                          border: '2px solid yellow',
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{data.title}</h5>
                        <button
                          onClick={() => handleUpdate(data)}
                          className="btn btn-primary me-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(data._id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
