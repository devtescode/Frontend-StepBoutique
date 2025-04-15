import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar-page/Navbar';
import UserNavbar from '../UserNavbar/UserNavbar';

const Userviewaddtochat = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const storedUser = localStorage.getItem("userDatas");
        // if (!storedUser) return;
        // const { userId } = JSON.parse(storedUser);
        // console.log("User ID:", userId);  // Make sure this ID is valid and correctly formatted.
        const fetchCart = async () => {
            try {
                const storedUser = localStorage.getItem("userDatas");
                if (!storedUser) return;
                const { userId } = JSON.parse(storedUser);

                const res = await axios.get(`http://localhost:4500/usercallerfetch/usergetusercart/${userId}`);

                // console.log("Response from Backend:", res.data);

                const { cartItems } = res.data;
                // console.log("Cart Items:", cartItems);
                setCartItems(cartItems);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    return (
        <>
            <Navbar />
            <UserNavbar />
            {/* <div className='mx-2'>
                <div className='text-white row align-items-start' style={{ marginTop: "70px" }}>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl shadow text-black">
                                        <hr />
                                        <img style={{ width: "100px" }} src={item.image} alt={item.productName} className="mb-2 rounded" />
                                        <h4>Name: {item.productName}</h4>
                                        <p>Description: {item.description}</p>
                                        <p>Price: {item.price}</p>
                                        <p>Location: State - {item.state}, City - {item.city}</p>
                                    </div>
                                ))
                            ) : (
                                <p className='fw-bold fs-5'>No product added yet</p>
                            )}
                        </div>
                    )}
                </div>
                <div className='border'>
                    <h3>CART SUMMARY</h3>
                    <p>Subtotal</p>

                </div>
            </div> */}



            <div className="container" style={{ marginTop: "90px" }}>
                <div className="row">
                    {/* Cart Items Section */}
                    <div className="col-12 col-md-9 mb-4 border bg-white rounded">
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item, index) => (
                                        <div key={index} className="col">
                                            <div className="bg-white p-3 rounded  align-items-center align-items-md-center gap-3 ">
                                                {/* Image Section */}
                                                <div className='justify-content-center text-center'>
                                                    <img
                                                        src={item.image}
                                                        alt={item.productName}
                                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                        className="rounded"
                                                    />
                                                </div>

                                                {/* Details Section */}
                                                <div className="flex-grow-1">
                                                    <h5 className="fw-bold">Name: {item.productName}</h5>
                                                    <p className="mb-1">Description: {item.description}</p>
                                                    <p className="mb-1">Price: ₦{item.price}</p>
                                                    <p className="mb-0">
                                                        Location: State - {item.state}, City - {item.city}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>


                                    ))
                                ) : (
                                    <p className="fw-bold fs-5 text-black">No product added yet</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Cart Summary Section */}
                    <div className="col-12 col-md-3">
                        <div className="border bg-white p-3 rounded shadow">
                            <h3 className="fs-5 fw-bold mb-3">CART SUMMARY</h3>
                            <hr />
                            <p>Total Items: {cartItems.length}</p>
                            <p>
                                Subtotal: ₦
                                {cartItems.reduce((total, item) => total + Number(item.price), 0)}
                            </p>
                            {/* Add more details like delivery, tax, or checkout button here if needed */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Userviewaddtochat;
