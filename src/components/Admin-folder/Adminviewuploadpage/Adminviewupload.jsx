import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar-page/Navbar";
import AdminNavbar from "../AdminNavbar";

const Adminviewupload = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4500/admin/getuploadProducts");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://localhost:4500/admin/saveuploadProduct/${editProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editProduct),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        setProducts(products.map((p) => (p._id === editProduct._id ? editProduct : p)));
        setEditProduct(null);

        // Close the modal after saving
        const modalElement = document.getElementById("editModal");
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      } else {
        alert("Error updating product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://localhost:4500/admin/deleteuploadProduct/${productId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            setProducts(products.filter((product) => product._id !== productId));
            Swal.fire("Deleted!", "The product has been deleted.", "success");
          } else {
            Swal.fire("Error!", "There was an issue deleting the product.", "error");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error!", "An error occurred. Please try again.", "error");
        }
      }
    });
  };

  return (
    <div>
      <Navbar />
      <AdminNavbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Uploaded Products</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6">No products available.</td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={product._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.image}
                        alt={product.productName}
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.description}</td>
                    <td>₦{product.price}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal"
                        onClick={() => setEditProduct(product)}
                      >
                        <i class="ri-edit-line"></i>
                      </button> 
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <i className="ri-delete-back-2-line"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Edit Product</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {editProduct && (
                <form>
                  <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input type="text" className="form-control" name="productName" value={editProduct?.productName || ""} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" style={{ height: "100px" }} name="description" value={editProduct?.description || ""} onChange={handleChange}></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" name="price" value={editProduct?.price || ""} onChange={handleChange} />
                  </div>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminviewupload;
