import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar-page/Navbar'
import "./Dashboard.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

    const LogoutBTN = () => {
        navigate("/login")
        localStorage.removeItem("userlogin")
        localStorage.removeItem("token")
        localStorage.removeItem("userDatas")
    }
    return (
        <>
            <Navbar />
            <nav class="navbar navbar-expand-lg ">
                <div class="container-fluid">
                    <a class="navbar-brand text-white" href="#">Navbar</a>
                    <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{ justifyContent: "space-between" }}>
                        <div className=' w-100 '>
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center text-center mx-0 mx-sm-5">
                                <li class="nav-item" style={{ cursor: "pointer" }}>
                                    <a class="nav-link active text-white" aria-current="page" >Home</a>
                                </li>

                                <li class="nav-item dropdown" style={{ cursor: "pointer" }}>
                                    <a class="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Setting
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" style={{ cursor: "pointer" }}>Change Password</a></li>
                                        <li><a class="dropdown-item" style={{ cursor: "pointer" }}>Set Pin</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item" style={{ cursor: "pointer" }}>
                                    <a class="nav-link disabled text-white" aria-disabled="true">Profile</a>
                                </li>
                                <li class="nav-item" style={{ cursor: "pointer" }}>
                                    <a class="nav-link disabled text-white" aria-disabled="true">Product</a>
                                </li>
                                <li class="nav-item" style={{ cursor: "pointer" }}>
                                    <a class="nav-link disabled text-white" aria-disabled="true">Add Chat</a>
                                </li>
                                <li class="nav-item" style={{ cursor: "pointer" }} onClick={LogoutBTN}>
                                    <a class="nav-link disabled text-white" aria-disabled="true" >LogOut</a>
                                </li>

                            </ul>
                        </div>
                        <div class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-custom" type="submit">Search</button>

                        </div>
                    </div>
                </div>
            </nav>

            <div class="text-center mx-auto mt-4" style={{ width: "95%" }}>
                <div className='text-start text-white'>
                    <h2>
                        Name: {user.Username}
                    </h2>
                    <h2>
                        Balance: 0
                    </h2>
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
                                    2
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
                                    ₦700
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
        </>
    )
}

export default Dashboard