import React from 'react'
import { useNavigate } from 'react-router-dom'
const AdminNavbar = () => {
    const navigate = useNavigate()
    const Logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminLogin");
        navigate("/adminlogin")
    }
    const NavigatetoUpload = () => {
        navigate("/adupload")
    }
    const HomeNavigate = () => {
        navigate("/admindb")
    }
    const NavigatetoViewUpload=()=>{
        navigate("/adviewupload")
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: "#23527c" }}>
                <div class="container-fluid">
                    <a class="navbar-brand text-white" style={{ cursor: "pointer" }} onClick={HomeNavigate}>Navbar</a>
                    <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{ justifyContent: "space-between" }}>
                        <div className=' w-100 '>
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center text-center mx-0 mx-sm-5">
                                <li class="nav-item" style={{ cursor: "pointer" }} onClick={HomeNavigate}>
                                    <a class="nav-link active text-white" aria-current="page" >Home</a>
                                </li>
                                <li class="nav-item" style={{ cursor: "pointer" }}>
                                    <a class="nav-link active text-white" aria-current="page" >History</a>
                                </li>
                                <li class="nav-item dropdown" style={{ cursor: "pointer" }}>
                                    <a class="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Upload
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item" style={{ cursor: "pointer" }} onClick={NavigatetoUpload}>
                                            <a class="nav-link active disabled" aria-disabled="true">Upload</a>
                                        </li>
                                        <li class="nav-item" style={{ cursor: "pointer" }} onClick={NavigatetoViewUpload}>
                                            <a class="nav-link active disabled" aria-disabled="true">View Upload</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="nav-item" style={{ cursor: "pointer" }}>
                                    <a class="nav-link disabled text-white" aria-disabled="true">Profile</a>
                                </li>
                                <li class="nav-item" style={{ cursor: "pointer" }}>
                                    <a class="nav-link disabled text-white" aria-disabled="true">Settings</a>
                                </li>
                                <li class="nav-item" onClick={Logout} style={{ cursor: "pointer" }}>
                                    <a class="nav-link disabled text-white" aria-disabled="true" >LogOut</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar