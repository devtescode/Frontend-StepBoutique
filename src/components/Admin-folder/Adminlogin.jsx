import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import Swal from 'sweetalert2';
import Loader from '../Loader-page/Loader';

const Adminlogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      Email: '',
      Password: '',
    },
    validationSchema: Yup.object({
      Email: Yup.string().email("Invalid email format").required("Email is required"),
      Password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:4500/admin/adminlogin", values);

        if (response.data.status) {
          // Check if the user is actually an admin
          if (response.data.adminData.role !== "admin") {
            Swal.fire({
              title: "Access Denied",
              text: "You are not authorized as an admin",
              icon: "error",
            });
            return;
          }



          Swal.fire({
            title: "Success",
            text: "Login successful!",
            icon: "success",
            confirmButtonText: "OK", // Custom button text (optional)
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem("adminToken", response.data.adminToken); // Store admin token
              localStorage.setItem("adminLogin", true); // Store admin login status
              navigate("/admindb"); // Navigate only after user clicks "OK"
            }
          });
        
        } else {
          Swal.fire({
            title: "Login Failed",
            text: response.data.message,
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "An error occurred. Please try again.",
          icon: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      {isLoading && <Loader />}
      <div className='parentcontainer'>
        <div className="containersignup col-md-5">
          <div className="row" style={{ width: "100%" }}>
            <div className="p-2 border text-white rounded-4" style={{ backgroundColor: "#ffffff" }}>
              <div className='text-center'>
                <h2 className='text-dark'>Admin Login</h2>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email" className='text-dark'>Email</label>
                  <input
                    className={`form-control p-2 ${formik.touched.Email && formik.errors.Email ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Email"
                    value={formik.values.Email}
                    type="email"
                    placeholder="Enter admin email"
                  />
                  {formik.touched.Email && formik.errors.Email && <div className="invalid-feedback">{formik.errors.Email}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="password" className='text-dark'>Password</label>
                  <input
                    className={`form-control p-2 ${formik.touched.Password && formik.errors.Password ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="Password"
                    value={formik.values.Password}
                    type="password"
                    placeholder="Enter admin password"
                  />
                  {formik.touched.Password && formik.errors.Password && <div className="invalid-feedback">{formik.errors.Password}</div>}
                </div>

                <div className='text-center'>
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
