import React, { useState } from "react";
import axios from "axios";

export default function Sing_Up() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/signup", formData)
      .then((response) => {
        console.log("User signed up successfully!", response.data);
        alert("User signed up successfully!")
        // Redirect to another page or show a success message
      })
      .catch((error) => {
        console.error("Error signing up:", error.response?.data?.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Create an Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address:</label>
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
                    Sign Up
                  </button>
                </div>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
