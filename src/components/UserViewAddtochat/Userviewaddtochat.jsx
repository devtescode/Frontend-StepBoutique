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
            <div style={{ width: "95%", marginTop: "80px", margin:"auto" }}>
                <div className='text-white' style={{marginTop:"70px"}}>
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
            </div>
        </>
    );
};

export default Userviewaddtochat;
