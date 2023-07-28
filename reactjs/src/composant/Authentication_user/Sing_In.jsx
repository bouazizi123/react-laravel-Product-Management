import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login({ userName, setUserName }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/login", formData)
      .then((response) => {
        console.log("API Response Data:", response.data.name);
        const user = response.data.name;
        if (user) {
          setUserName(user); // Set the user name in the state
          navigate("/produit");
        } else {
          console.error("Error logging in: Invalid response data.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const handleLogout = () => {
    setUserName(""); // Clear the user name to signify logout
  };

  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Log In</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <center>
                <div className="form-group mt-4">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
                </center>
                <center> <p>Don’t have an account ? <Link to={"/singup"}>Create an account</Link> </p> </center>
              </form>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
