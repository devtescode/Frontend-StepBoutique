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

   
    return (
        <>
            <Navbar />
            <UserNavbar/>
            <div class="text-center mx-auto" style={{ width: "95%", marginTop:"80px" }}>
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
                                <h2>
                                    Available Product
                                </h2>
                            </div>
                            <div>
                                <h2>
                                    40
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="border mt-sm-0 bg-white mt-3 db_col_all">
                        <div>
                            <div>
                                <h2>
                                    No purchase
                                </h2>
                            </div>
                            <div>
                                <h2>
                                    5
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="border mt-sm-0 bg-white mt-3  db_col_all">
                        <div>
                            <div>
                                <h2>
                                    Amount purchase
                                </h2>
                            </div>
                            <div>
                                <h2>
                                    ₦700
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-4 db_recent-page_code'>

                <div class="container">
                    <div class="row">
                        <div class="col-sm-5 col-md-6 border border-light bg-white" style={{ height: "70vh" }}>
                            <div>
                                <p>
                                    Recent Product
                                </p>
                            </div>

                            <div className='border border-light d-flex shadow p-2 justify-content-between' style={{ alignItems: "center" }}>
                                <div className=''>
                                    <div className='border border-2 rounded-5' style={{ width: "40px", height: "40px" }}>

                                    </div>
                                    <p>
                                        Admin
                                    </p>
                                </div>
                                <div className='text-center'>
                                    <div className='border border-2 rounded-5' style={{ width: "40px", height: "40px" }}>

                                    </div>
                                    Shoe
                                </div>

                                <div className='text-center'>
                                    <div >
                                        {/* You can saved it */}

                                        <i class="ri-bookmark-line fw-bold fs-4" style={{ cursor: "pointer" }}></i>
                                        {/* <i class="ri-bookmark-fill"></i> */}

                                    </div>
                                    <p>
                                        save
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-5 offset-sm-2 col-md-6 offset-md-0 border border-light bg-white" style={{ height: "70vh" }}>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard