import React, { useEffect, useState } from "react";
import Navbar from "../Navbar-page/Navbar";
import UserNavbar from "../UserNavbar/UserNavbar";
import Loader from "../Loader-page/Loader";
import axios from "axios";

const Userproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
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
    const userData = JSON.parse(localStorage.getItem("userDatas"));
    // console.log(userData);
    if (userData && userData.userId) {
      setUserId(userData.userId);
    }

    fetchProducts();
  }, []);


  // const toggleLike = async (productId) => {
  //   try {
  //     const response = await axios.post("http://localhost:4500/usercallerfetch/like", {
  //       userId,
  //       productId,
  //     });

  //     if (response.data.success) {
  //       // Update product like status locally
  //       setProducts((prevProducts) =>
  //         prevProducts.map((product) =>
  //           product._id === productId
  //             ? { ...product, likes: response.data.likes } // Update likes array from server response
  //             : product
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error toggling like:", error);
  //   }
  // };


  const handleLikeToggle = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:4500/usercallerfetch/like/${productId}`, {
        userId
      });

      if (response.status === 200) {
        const updatedProduct = response.data.product;  // Updated product from backend

        setProducts(products => products.map(product =>
          product._id === productId ? updatedProduct : product
        ));
      }
    } catch (error) {
      console.error("Error liking/unliking product:", error);
    }
  };



  return (
    <div>
      <Navbar />
      <UserNavbar />

      <div className="container" style={{ marginTop: "80px" }}>
        {/* <h2 className="text-center mb-4 text-white" style={{marginTop:"65px"}}>Available Products</h2> */}

        {loading ? (
          <p className="text-center">
            <Loader />
          </p>
        ) : (
          <div className="row">
            {/* Show "No products available" only if loading is false and products array is empty */}
            {products.length === 0 ? (
              <p className="text-center text-danger">No products available.</p>
            ) : (
              products.map((product) => {
                const isLiked = product.likes?.includes(userId); // Check if user liked this product (userId should be defined from localStorage)

                return (
                  <div key={product._id} className="col-md-4 col-sm-6 mb-4">
                    <div className="card shadow-sm">
                      <img
                        src={`${product.image}`}
                        className="card-img-top"
                        alt={product.productName}
                        style={{ height: "350px", objectFit: "cover" }}
                      />
                      <div className="text-end p-2">
                        {/* <i
                          className={isLiked ? "ri-heart-fill fs-3" : "ri-heart-line fs-3"}
                          style={{ color: "#23527c", cursor: "pointer" }}
                          onClick={() => handleLikeToggle(product._id)}
                        ></i> */}
                        {product.likes?.includes(userId) ? (
                          <i
                            className="ri-heart-fill fs-3"
                            style={{ color: "#23527c", cursor: 'pointer' }}
                            onClick={() => handleLikeToggle(product._id)}
                          ></i>
                        ) : (
                          <i
                            className="ri-heart-line fs-3"
                            style={{ color: "#23527c", cursor: 'pointer' }}
                            onClick={() => handleLikeToggle(product._id)}
                          ></i>
                        )}
                          <p className="text-secondary" style={{ fontSize: "14px" }}>
                          {product.likes?.length || 0} {product.likes?.length === 1 ? 'Like' : 'Likes'}
                      </p>

                      </div>
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{product.productName}</h5>
                        <p className="card-text">Description: {product.description}</p>
                        <h6 className="text-primary fw-bold">
                          Price: ₦{product.price.toLocaleString()}
                        </h6>
                        <button className="btn btn-primary w-100">View Product</button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Userproduct;
