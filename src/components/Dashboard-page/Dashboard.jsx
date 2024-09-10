import React from 'react'
import Navbar from '../Navbar-page/Navbar'
import "./Dashboard.css"

const Dashboard = () => {
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
                                <li class="nav-item ">
                                    <a class="nav-link active text-white" aria-current="page" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link text-white" href="#">Link</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled text-white" aria-disabled="true">Disabled</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled text-white" aria-disabled="true">Disabled</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled text-white" aria-disabled="true">Disabled</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled text-white" aria-disabled="true">Disabled</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled text-white" aria-disabled="true">Disabled</a>
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
        </>
    )
}

export default Dashboard