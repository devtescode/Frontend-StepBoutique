import React, { useState, useEffect } from 'react'
import Navbar from '../../Navbar-page/Navbar'
import AdminNavbar from '../AdminNavbar'

const Adminalluserslike = () => {
    const [likedUsers, setLikedUsers] = useState([]);

    useEffect(() => {
        const fetchAllLikedUsers = async () => {
            try {
                const usersRes = await fetch("http://localhost:4500/admin/likedUsersWithProducts");
                const usersData = await usersRes.json();
                setLikedUsers(usersData.likedUsers || []);
            } catch (error) {
                console.error("Error fetching liked users:", error);
                setLikedUsers([]);
            }
        };

        fetchAllLikedUsers();
    }, []);

    return (
        <div>
            <Navbar />
            <AdminNavbar />
            <div className="container mt-3">
                <h2>All Liked Users</h2>
                <table className="table table-bordered table-light">
                    <thead className="text-center">
                        <tr>
                            <th>#</th>
                            <th className="whitespace-nowrap">Full Name</th>
                            <th>Email</th>
                            <th>Liked Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {likedUsers.length > 0 ? (
                            likedUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.Username}</td>
                                    <td>{user.Email}</td>
                                    <td>
                                    <ul className="row list-unstyled g-3 overflow-hidden">
                                            {user.likedProducts?.map((product, idx) => (
                                                <li
                                                    key={idx}
                                                    className=" p-2 g-2 col-12 col-sm-6 col-md-4 col-lg-4 d-flex align-items-center gap-2 flex-wrap"
                                                >
                                                    <img
                                                        src={product.productImage}
                                                        alt={product.productName}
                                                        className="img-fluid rounded"
                                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                    />
                                                    {product.productName}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No users have liked any products yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Back Button */}
                <div className="text-center mt-3">
                    <button className="btn btn-secondary" onClick={() => window.history.back()}>
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Adminalluserslike