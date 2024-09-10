import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
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
            // navigate('/login')
            axios.post("http://localhost:4500/usercallerfetch/login", { Email: values.Email, Password: values.Password })
                .then((response) => {
                    console.log(response);
                    alert(response.data.message)

                    if (response.data.status === true) {
                        alert(response.data.message)
                        navigate("/db")
                        // Swal.fire({
                        //     icon: "success",
                        //     title: "Success",
                        //     text: response.data.message,
                        // });
                    }
                })
                .catch(error => {
                    alert("There was an error occured");
                    console.error('There was an error occured', error);
                    // Swal.fire({
                    //     icon: "error",
                    //     title: "Error",
                    //     text: "There was an error occured",
                    // });
                });

        }
    })

    const RegisterBtn = () => {
        navigate("/signup");
    }
    return (
        <>

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