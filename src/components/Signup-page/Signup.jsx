import React, { useState } from 'react'
import "./Signup.css"
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import Loader from '../Loader-page/Loader'

const Signup = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            Username: "",
            Email: "",
            Number: "",
            Password: "",
        },
        validationSchema: Yup.object({
            Username: Yup.string()
                .required("Username is required"),
            Email: Yup.string()
                .required("Email is required"),
            Number: Yup.string()
                .required("Number is required"),
            Password: Yup.string()
                .required("Email is required"),
        }),
        onSubmit: (values) => {
            // console.log(values)
            // navigate('/login')
            setIsLoading(true);
            axios.post("http://localhost:4500/usercallerfetch/register", { Username: values.Username, Email: values.Email, Number: values.Number, Password: values.Password })
                .then((response) => {
                    // console.log(response);
                    Swal.fire({
                        title: "",
                        text: response.data.message,
                        icon: "warning"
                    });
                    if (response.data.status === true) {
                        // alert()
                        Swal.fire({
                            title: "",
                            text: response.data.message,
                            icon: "success"
                        });
                        navigate("/login")
                       
                    }
                })
                .catch(error => {
                    if (!error.response) {
                        Swal.fire({
                            title: "Network Error",
                            text: "Please check your network connection or try again later.",
                            icon: "error"
                        });
                    } else if (error.response.status === 500) {
                        Swal.fire({
                            title: "Server Error",
                            text: "Internal Server Error. Please try again later.",
                            icon: "error"
                        });
                    } else {
                        Swal.fire({
                            // : ${error.response.data.message || error.message}
                            title: "Error",
                            text: `There was an error occurred`,
                            icon: "error"
                        });
                    }
                }).finally(() => {
                    setIsLoading(false); 
                });

        }
    })

    const LoginBtn =()=>{
        navigate("/login")
    }
    return (
        <>
        {isLoading && <Loader/>}
            <div className='parentcontainer'>
                <div className="containersignup">
                    <div className="row" style={{ width: "100%" }}>
                        <div className=" p-2 border  text-white rounded-4" style={{ backgroundColor: "#23527c" }}>
                            <div className='text-center'>
                                <h2 className=''>Sign-Up</h2>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-group">
                                    <label for="name">Username</label>
                                    <input
                                        className={`form-control p-2 ${(formik.values.Username && !formik.errors.Username) ||
                                            (formik.touched.Username && formik.values.Username && formik.errors.Username && formik.touched.Username && formik.values.Username)
                                            ? 'is-valid'
                                            : formik.values.Username || formik.touched.Username
                                                ? 'is-invalid'
                                                : ''
                                            }`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="Username"
                                        value={formik.values.Username}
                                        type="text" placeholder="Enter your name" />
                                </div>
                                <div className="form-group">
                                    <label for="email">Email</label>
                                    <input
                                        className={`form-control p-2 ${(formik.values.Email && !formik.errors.Email) ||
                                            (formik.touched.Email && formik.values.Email && formik.errors.Email && formik.touched.Email && formik.values.Email)
                                            ? 'is-valid'
                                            : formik.values.Email || formik.touched.Email
                                                ? 'is-invalid'
                                                : ''
                                            }`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="Email"
                                        value={formik.values.Email}
                                        type="email" placeholder="Enter your email" />
                                </div>
                                <div className="form-group">
                                    <label for="password">Number</label>
                                    <input
                                        className={`form-control p-2 ${(formik.values.Number && !formik.errors.Number) ||
                                            (formik.touched.Number && formik.values.Number && formik.errors.Number && formik.touched.Number && formik.values.Number)
                                            ? 'is-valid'
                                            : formik.values.Number || formik.touched.Number
                                                ? 'is-invalid'
                                                : ''
                                            }`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="Number"
                                        value={formik.values.Number}
                                        type="text" placeholder="Enter your Number" />
                                </div>

                                <div className="form-group">
                                    <label for="confirm-password">Password</label>
                                    <input
                                        className={`form-control p-2 ${(formik.values.Password && !formik.errors.Password) ||
                                            (formik.touched.Password && formik.values.Password && formik.errors.Password && formik.touched.Password && formik.values.Password)
                                            ? 'is-valid'
                                            : formik.values.Password || formik.touched.Password
                                                ? 'is-invalid'
                                                : ''
                                            }`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="Password"
                                        value={formik.values.Password}
                                        type="text" placeholder="Enter your password" />
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                            <div className='text-center mt-2'>
                                <div>
                                    <span>

                                        Alreadly have an Account?
                                    </span>
                                    <span className='text-primary mx-1' style={{cursor:"pointer"}} onClick={LoginBtn}>
                                        Login
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Signup