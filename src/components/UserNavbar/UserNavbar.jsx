import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logofolder/logo.png'
const UserNavbar = () => {
    let navigate = useNavigate()
    const LogoutBTN = () => {
        navigate("/login")
        localStorage.removeItem("userlogin")
        localStorage.removeItem("token")
        localStorage.removeItem("userDatas")
    }

    const ProductBtn=()=>{
        navigate("/userproduct")
    }

    const HomeBtn=()=>{
        navigate("/db")
    }
  return (
    <div>
        
        <nav class="navbar navbar-expand-lg fixed-top " style={{backgroundColor:"#23527c"}}>
                <div class="container-fluid">
                    <img src={Logo} class="navbar-brand text-white" style={{width:"45px"}} alt="" />
                    <button class="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{ justifyContent: "space-between" }}>
                        <div className=' w-100 '>
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center text-center mx-0 mx-sm-5">
                                <li class="nav-item" style={{ cursor: "pointer" }} onClick={HomeBtn}>
                                    <a class="nav-link active text-white" aria-current="page" >Home</a>
                                </li>
                                <li class="nav-item" style={{ cursor: "pointer" }}>
                                    <a class="nav-link active text-white" aria-current="page" >Wallet</a>
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
                                <li class="nav-item" style={{ cursor: "pointer" }} onClick={ProductBtn}> 
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

    </div>
  )
}

export default UserNavbar