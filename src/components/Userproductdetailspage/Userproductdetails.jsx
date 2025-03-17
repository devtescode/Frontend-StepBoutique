import React, { useEffect, useState } from "react";
import Navbar from "../Navbar-page/Navbar";
import UserNavbar from "../UserNavbar/UserNavbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader-page/Loader";

const Userproductdetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4500/admin/getProduct/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [id]);

    const addToCart = () => {
        console.log(`Added ${product.productName} to cart!`);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Loader />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <p className="fs-4 fw-semibold text-muted">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100">
            <Navbar />
            <UserNavbar />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow-lg">
                            <img
                                src={product.image}
                                alt={product.productName}
                                className="card-img-top"
                                style={{ height: "400px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h2 className="card-title text-primary">{product.productName}</h2>
                                <p className="card-text text-muted">{product.description}</p>
                                <h4 className="text-success fw-bold">Price: ₦{product.price.toLocaleString()}</h4>
                                <button
                                    className="btn btn-success mt-3 px-4 py-2 fw-semibold"
                                    onClick={addToCart}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Userproductdetails;
