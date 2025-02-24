import React, { useState } from 'react';
import Navbar from '../Navbar-page/Navbar';
import AdminNavbar from './AdminNavbar';
import "./Adminupload.css";

const Adminupload = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase(); // Convert extension to lowercase
            const fileNameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name; // Get name without extension
    
            // Create a new file with the corrected extension
            const renamedFile = new File([file], `${fileNameWithoutExt}.${fileExtension}`, { type: file.type });
    
            console.log("Renamed File:", renamedFile); // Debugging log
    
            setImage(renamedFile); // Ensure the updated file is set
        }
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName || !price || !description || !image) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("image", image); // Append image file

        try {
            setLoading(true);
            const response = await fetch("http://localhost:4500/admin/upload", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("Upload Successful:", result);
            if (response.ok) {
                alert("Product uploaded successfully!");
                setProductName("");
                setPrice("");
                setDescription("");
                setImage(null);
            } else {
                // alert("Error uploading product: " + result.message);
                alert("⚠️ Error uploading product: " + (result.message || "Unknown error"));
                console.error("Server Error:", result);
            }
        } catch (error) {
            alert("❌ Error uploading product: " + error.message);
            console.error("Upload Error:", error);
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <div>
            <Navbar />
            <AdminNavbar />
            <div className="container" style={{ marginTop: "80px" }}>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0 rounded-2 shadow-sm">
                            <div className='text-center mt-3'>
                                <h2 style={{ color: "#23527c" }}>Upload</h2>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="productName" style={{ color: "#23527c" }} className="form-label fw-bold">
                                            Product Name
                                        </label>
                                        <input type="text" className="form-control" id="productName" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" style={{ color: "#23527c" }} className="form-label fw-bold">
                                            Price
                                        </label>
                                        <input type="text" className="form-control" id="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" style={{ color: "#23527c" }} className="form-label fw-bold">
                                            Description
                                        </label>
                                        <textarea className="form-control" style={{ height: "140px" }} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>
                                    <h6 className="mb-2 my-4 fw-bold" style={{ color: "#23527c" }}>Upload Product</h6>
                                    <div className="upload-area border-2 border-dashed rounded-4 p-5 text-center">
                                        <div className="image-icon-wrapper mb-3">
                                            <i className="ri-image-fill text-primary fs-1"></i>
                                        </div>
                                        <p className="mb-2">Drag & Drop</p>
                                        <p className="mb-1">
                                            or <span className="text-primary">browse</span>
                                        </p>
                                        <small className="text-muted">Supports: JPG, JPG, PNG</small>
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mt-3" />
                                    </div>
                                    <div className='text-center mt-4 '>
                                        <button type="submit" className='btn btn p-2 w-50 text-white' style={{ backgroundColor: "#23527c" }} disabled={loading}>
                                            {loading ? "Uploading..." : "Submit"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Adminupload;
