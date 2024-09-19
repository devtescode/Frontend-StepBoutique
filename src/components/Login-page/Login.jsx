import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import Loader from '../Loader-page/Loader'

const Login = () => {
    const navigate = useNavigate()

    localStorage.removeItem("userlogin")
    useEffect(() => {
        if (!localStorage.token) {
          navigate('/login');
        }
      }, []);
      
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            Email: "",
            Password: "",
        },
        validationSchema: Yup.object({
            Email: Yup.string()
                .required("Email is required"),
            Password: Yup.string()
                .required("Email is required"),
        }),
        onSubmit: (values) => {
            // console.log(values)
            setIsLoading(true);
            axios.post("http://localhost:4500/usercallerfetch/login", { Email: values.Email, Password: values.Password })
                .then((response) => {
                    // console.log(response);
                   
                    Swal.fire({
                        title: "",
                        text: response.data.message,
                        icon: "warning"
                    });
                    if (response.data.status === true) {
                        
                        Swal.fire({
                            title: "",
                            text: response.data.message,
                            icon: "success"
                        });
                        
                        localStorage.setItem("userDatas", JSON.stringify(response.data.userDatas));
                        localStorage.token = response.data.token
                        localStorage.setItem("token", response.data.token);
                        navigate("/db")
                        localStorage.setItem("userlogin", true)
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

    const RegisterBtn = () => {
        navigate("/signup");
    }
    return (
        <>
        {isLoading && <Loader/>}
            <div className='parentcontainer'>
                <div className="containersignup">
                    <div className="row" style={{ width: "100%" }}>
                        <div className=" p-2 border  text-white rounded-4" style={{ backgroundColor: "#23527c" }}>
                            <div className='text-center'>
                                <h2 className=''>Login</h2>
                            </div>
                            <form onSubmit={formik.handleSubmit}>
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
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        <div className='text-center mt-2'>
                            <div>
                                <span>

                                 Don't have an account?
                                </span>
                                <span className='text-primary mx-1' style={{ cursor: "pointer" }} onClick={RegisterBtn}>
                                    Register
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

export default Login