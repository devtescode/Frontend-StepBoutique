import React, { useEffect, useState } from "react";
import Navbar from "../Navbar-page/Navbar";
import UserNavbar from "../UserNavbar/UserNavbar";

const Userproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:4500/admin/getuploadProducts");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <UserNavbar />

      <div className="container mt-4">
        <h2 className="text-center mb-4">Available Products</h2>
        {loading ? <p className="text-center">Loading...</p> : null}

        <div className="row">
          {products.length === 0 ? (
            <p className="text-center">No products available.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="col-md-4 col-sm-6 mb-4">
                <div className="card shadow-sm">
                  <img
                    src={`${product.image}`}
                    className="card-img-top"
                    alt={product.productName}
                    style={{ height: "350px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Product: {product.productName}</h5>
                    <p className="card-text">Description: {product.description}</p>
                    <h6 className="text-primary fw-bold">Price: ₦{product.price}</h6>
                    <button className="btn btn-primary w-100">Buy Now</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Userproduct;
