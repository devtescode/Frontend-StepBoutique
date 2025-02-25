import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar-page/Navbar'
import "./Dashboard.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserNavbar from '../UserNavbar/UserNavbar'

const Dashboard = () => {
    let navigate = useNavigate()
    const [user, setUser] = useState("");
    let url = "http://localhost:4500/usercallerfetch/db"
    useEffect(() => {
        let token = localStorage.token;
        axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        }).then((response) => {
            if (!localStorage.userlogin || response.data.status === false) {
                console.log("User not logged in");
                alert("User not logged in")
                navigate("/login")
            }
            else {
                setUser(response.data.user)
                // console.log(response.data.user);
            }
        })
            .catch((err) => {
                if (err.response) {

                    console.error("Error Response:", err.response.data);
                } else if (err.request) {

                    console.error("No Response:", err.request);
                } else {

                    console.error("Error:", err.message);
                }
            })
    }, [navigate])


    const [productCount, setProductCount] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        const fetchProductCount = async () => {
            try {
                const response = await fetch("http://localhost:4500/admin/availableProducts");
                const data = await response.json();
                setProductCount(data.count);
            } catch (error) {
                console.error("Error fetching product count:", error);
            }
        };

        fetchProductCount();
    }, []);

    const [recentProducts, setRecentProducts] = useState([]);
    useEffect(() => {
        const fetchRecentProducts = async () => {
            try {
                const response = await axios.get("http://localhost:4500/admin/recentProduct"); // Adjust API endpoint
                setRecentProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching recent products:", error);
            }
        };

        fetchRecentProducts();
    }, []);

    return (
        <>
            <Navbar />
            <UserNavbar />
            <div class="text-center mx-auto" style={{ width: "95%", marginTop: "80px" }}>
                <div className='text-start text-white'>
                    <h5>
                        Name: {user.Username}
                    </h5>
                    <h5>
                        Balance: 0
                    </h5>
                </div>
                <div class=" gap-2 d-lg-flex d-md-flex d-sm-block mt-3">
                    <div class="border bg-white db_col_all">
                        <div>
                            <div>
                                <h4>
                                    Available Product
                                </h4>
                            </div>
                            <div>
                                <h4>
                                    {productCount}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="border mt-sm-0 bg-white mt-3 db_col_all">
                        <div>
                            <div>
                                <h4>
                                    No purchase
                                </h4>
                            </div>
                            <div>
                                <h4>
                                    0
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="border mt-sm-0 bg-white mt-3  db_col_all">
                        <div>
                            <div>
                                <h4>
                                    Amount purchase
                                </h4>
                            </div>
                            <div>
                                <h4>
                                    ₦7,000
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row g-4">
                    {/* Recent Products Section */}
                    <div className="col-md-6">
                        <div className="card shadow-lg border-0 p-3 bg-white rounded h-100">
                            <h5 className="fw-bold text-primary">Recent Products</h5>

                            {recentProducts.length > 0 ? (
                                recentProducts.map((product, index) => (
                                    <div
                                        key={index}
                                        className="d-flex align-items-center p-3 border rounded shadow-sm mb-2"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setSelectedProduct(product)} // Set selected product on click
                                    >
                                        <div
                                            className="rounded-circle overflow-hidden"
                                            style={{ width: "50px", height: "50px" }}
                                        >
                                            <img
                                                src={product.image}
                                                alt="Product"
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        </div>

                                        <div className="ms-3">
                                            <h6 className="fw-bold">{product.productName}</h6>
                                            <p className="text-muted m-0 fw-bold">{product.description}</p>
                                            <p className="text-muted m-0 fw-bold">₦{product.price.toLocaleString()}</p>
                                        </div>

                                        <div className="ms-auto text-center">
                                            <i
                                                className="ri-bookmark-line fs-4 text-warning"
                                                style={{ cursor: "pointer" }}
                                            ></i>
                                            <p className="text-muted small">Save</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted text-center mt-3">
                                    No recent products available
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Click to View Section */}
                    <div className="col-md-6">
                        <div className="card shadow-lg border-0 p-3 bg-white rounded h-100">
                            {selectedProduct ? (
                                <div className="d-flex flex-column align-items-center justify-content-center  h-100">
                                    <img
                                        src={selectedProduct.image}
                                        alt="Selected Product"
                                        className="img-fluid rounded mb-3"
                                        style={{ maxHeight: "200px" }}
                                    />
                                    <div className='text-center'>

                                        <p className="text-muted">Product Name: {selectedProduct.productName}</p>
                                        {/* <span className="text-muted">Product Name: </span>
                               <span className="fw-bold">{selectedProduct.productName}</span> */}
                                        <p className="text-muted">Description: {selectedProduct.description}</p>
                                        <p className="fw-bold text-muted">Price: ₦{selectedProduct.price.toLocaleString()}</p>
                                    </div>
                                </div>

                            ) : (
                                <p className="text-muted text-center fs-5 fw-bold" >Click on a product to view</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard