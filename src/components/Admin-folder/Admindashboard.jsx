import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar-page/Navbar'
import AdminNavbar from './AdminNavbar'
import Loader from '../Loader-page/Loader';
import { useNavigate } from 'react-router-dom';


const Admindashboard = () => {
    const [loading, setLoading] = useState(false);
    const [productCount, setProductCount] = useState(0);
    const [totalLikes, setTotalLikes] = useState(0);
    const [likedUsers, setLikedUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]); // Stores only the last 2 users
    useEffect(() => {
        const fetchProductCount = async () => {
            setLoading(true);
            try {
                // Fetch available product count
                const response = await fetch("http://localhost:4500/admin/availableProducts");
                const data = await response.json();
                setProductCount(data.count || 0); // Ensure count is not undefined

                // Fetch total likes
                const likesRes = await fetch("http://localhost:4500/admin/totalLikes");
                const likesData = await likesRes.json();
                setTotalLikes(likesData.totalLikes || 0);

                // Fetch users with liked products
                const usersRes = await fetch("http://localhost:4500/admin/likedUsersWithProducts");
                const usersData = await usersRes.json();

                console.log("Users who liked products:", usersData);
                setLikedUsers(usersData.likedUsers || []); // Ensure it's always an array
                setDisplayedUsers(usersData.likedUsers.slice(-2)); // Show only last 2 users
            } catch (error) {
                console.error("Error fetching product count:", error);
                setLikedUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProductCount();
    }, []);

    const navigate = useNavigate();
    const seeAllBtn = () => {
        // alert("")
        navigate("/adlikedusers")
    }
    return (
        <>
            <Navbar />
            <AdminNavbar />
            {loading && <Loader />}
            <div class="text-center mx-auto" style={{ width: "99%", marginTop: "80px" }}>
                <div class=" gap-2 d-lg-flex d-md-flex d-sm-block mt-3">
                    <div class="border bg-white db_col_all rounded-4">
                        <div>
                            <div>
                                <h4>
                                    Wallet Amount
                                </h4>
                            </div>
                            <div>
                                <h4>
                                    0
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="border mt-sm-0 bg-white mt-3 db_col_all rounded-4">
                        <div>
                            <div>
                                <h4>
                                    Upload Product
                                </h4>
                            </div>
                            <div>
                                <h4>
                                    {productCount}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="border mt-sm-0 bg-white mt-3  db_col_all rounded-4">
                        <div>
                            <div>
                                <h4>
                                    Likes
                                </h4>
                            </div>
                            <div>
                                <h4>
                                    {totalLikes}
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div class="border mt-sm-0 bg-white mt-3  db_col_all rounded-4">
                        <div>
                            <div>
                                <h4>
                                    Add to cart
                                </h4>
                            </div>
                            <div>
                                <h4>
                                    0
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-responsive mt-2">
                <table className="table table-bordered text-center">
                    <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Liked Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.length > 0 ? (
                            displayedUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td className="text-nowrap">{user.Username}</td>
                                    <td className="text-nowrap">{user.Email}</td>
                                    <td>
                                        <div className="container-fluid">
                                            <ul className="row list-unstyled gap-2 mx-0">
                                                {user.likedProducts?.map((product, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex flex-column align-items-center shadow-sm justify-content-center gap-2 p-2 border rounded text-center"
                                                    >
                                                        <img
                                                            src={product.productImage}
                                                            alt={product.productName}
                                                            className="img-fluid rounded"
                                                            style={{ width: "90px", height: "90px", objectFit: "cover" }}
                                                        />
                                                        <span className="fw-semibold text-truncate" style={{ maxWidth: "90%" }}>
                                                            {product.productName}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>

                                        </div>
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



                {/* "See All" Button */}
                <div className="text-center mt-3">
                    <button
                        className="btn btn-primary"
                        // onClick={() => navigate = "/all-liked-users"}
                        // onClick={() => navigate("/all-liked-users")}  // ✅ Correct usage
                        onClick={seeAllBtn}
                    >
                        See All
                    </button>
                </div>
            </div>

        </>
    )
}

export default Admindashboard