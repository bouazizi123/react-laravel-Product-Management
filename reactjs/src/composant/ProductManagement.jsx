import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProduit from './EditProduit';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch the list of products from the API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error(error));
  }, []);

  // Function to handle product deletion
  const handleDelete = (id) => {
    // Send a DELETE request to the API
    axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
      .then((response) => {
        // If the deletion is successful, update the products state
        setProducts(products.filter((product) => product.id !== id));
        console.log(response.data.message);
      })
      .catch((error) => console.error(error));
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter the products based on the search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h2>Product List</h2>
      <Link to={"/addproduit"}>Add Product</Link>

      {/* Search input */}
      <div className="mt-3">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>

      {/* Product table */}
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Size</th>
            <th>Price</th>
            <th>Image</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.size}</td>
              <td>{product.price}</td>
              <td>
                {product.image ? (
                  <img src={product.image} alt={product.name} style={{ maxWidth: '100px' }} />
                ) : (
                  'No image available'
                )}
              </td>
              <td>{product.user_id}</td>
              <td>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
                <button className="btn btn-info btn-sm " style={{marginLeft:10}}>
                  <Link to={`/editproduit/${product.id}`} >
                    EditProduct
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
