import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar-page/Navbar'
import AdminNavbar from './AdminNavbar'
import Loader from '../Loader-page/Loader';


const Admindashboard = () => {
    const [loading, setLoading] = useState(false);
    const [productCount, setProductCount] = useState(0);
    useEffect(() => {
        const fetchProductCount = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:4500/admin/availableProducts");
                const data = await response.json();
                setProductCount(data.count);
            } catch (error) {
                console.error("Error fetching product count:", error);
            }
            setLoading(false);
        };

        fetchProductCount();
    }, []);
    return (
        <>
            <Navbar />
            <AdminNavbar />
            {loading && <Loader />}
            <div class="text-center mx-auto" style={{ width: "99%", marginTop: "80px" }}>
                <div class=" gap-2 d-lg-flex d-md-flex d-sm-block mt-3">
                    <div class="border bg-white db_col_all">
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
                    <div class="border mt-sm-0 bg-white mt-3 db_col_all">
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
                    <div class="border mt-sm-0 bg-white mt-3  db_col_all">
                        <div>
                            <div>
                                <h4>
                                    Likes
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
        </>
    )
}

export default Admindashboard