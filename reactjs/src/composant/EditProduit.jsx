import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditProduit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    size: '',
    price: '',
    image: '',
    user_id: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product details from the API
    axios.get(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => setProduct(response.data.product))
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a PUT request to update the product
    axios.put(`http://127.0.0.1:8000/api/products/${id}`, product)
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        // You can redirect to the product list page or perform any other action on successful update.
        navigate("/produit");
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Edit Product</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Size:</label>
                  <input
                    type="text"
                    name="size"
                    value={product.size}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>User ID:</label>
                  <input
                    type="text"
                    name="user_id"
                    value={product.user_id}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mt-4">
                  <button type="submit" className="btn btn-primary">
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduit;
