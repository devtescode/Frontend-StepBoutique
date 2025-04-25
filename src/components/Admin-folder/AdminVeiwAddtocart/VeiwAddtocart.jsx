import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar-page/Navbar'
import AdminNavbar from '../AdminNavbar'
import axios from 'axios';

const VeiwAddtocart = () => {
  const [userCarts, setUserCarts] = useState([]);
  useEffect(() => {
    const fetchUserCarts = async () => {
        try {
          // usercallerfetch
            const res = await axios.get("http://localhost:4500/admin/getaddtochatforeachuser");
            setUserCarts(res.data.userCarts);
        } catch (error) {
            console.error("Error fetching user carts:", error);
        }
    };

    fetchUserCarts();
}, []);

  return (
    <div>
      <Navbar />
      <AdminNavbar />
      <div style={{ marginTop: "70px" }}>
        <div className='text-white border mx-5'>
          <p className='fs-5'>User product</p>
          {userCarts.map(user => (
    <div key={user.userId} className="mb-4 p-3 bg-white border rounded shadow">
        <h5 className="fw-bold">{user.fullName} ({user.email})</h5>
        {user.cart.length > 0 ? (
            <div className="row mt-3">
                {user.cart.map((item, index) => (
                    <div key={index} className="col-12 col-md-4 mb-3">
                        <div className="card h-100">
                            <img
                                src={item.image}
                                className="card-img-top"
                                alt={item.productName}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.productName}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text"><strong>Price:</strong> {item.price}</p>
                                <p className="card-text">
                                    <strong>Location:</strong> {item.state}, {item.city}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-muted">No items in cart</p>
        )}
    </div>
))}

        </div>
      </div>
    </div>
  )
}

export default VeiwAddtocart