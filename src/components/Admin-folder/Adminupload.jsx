import React from 'react'
import Navbar from '../Navbar-page/Navbar'
import AdminNavbar from './AdminNavbar'
import "./Adminupload.css"
// import { ImageIcon } from "lucide-react"
const Adminupload = () => {
    return (
        <div>
            <Navbar />
            <AdminNavbar />
            <div className="container" style={{marginTop:"80px"}}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0 rounded-2 shadow-sm">
                            <div className='text-center mt-3'>
                                <h2>Upload</h2>
                            </div>
                            <div className="card-body p-4">

                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label fw-bold">
                                        Price
                                    </label>
                                    <input type="text" className="form-control" id="price" placeholder="Enter price" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label fw-bold">
                                        Description
                                    </label>
                                    <textarea className="form-control" style={{ height: "140px" }} placeholder="Enter description"></textarea>
                                </div>
                                <h6 className="mb-2 my-4 fw-bold">Upload Product</h6>

                                <div className="upload-area border-2 border-dashed rounded-4 p-5 text-center">
                                    <div className="image-icon-wrapper mb-3">
                                        {/* <ImageIcon size={40} className="text-primary" /> */}
                                        <i class="ri-image-fill text-primary fs-1"></i>
                                    </div>
                                    <p className="mb-2">Drag & Drop</p>
                                    <p className="mb-1">
                                        or <span className="text-primary">browse</span>
                                    </p>
                                    <small className="text-muted">Supports: JPG, JPG, PNG</small>
                                </div>
                                <div className='text-center mt-4 '>
                                    <button className='btn btn p-2 w-25 text-white' style={{ backgroundColor: "#23527c" }}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Adminupload