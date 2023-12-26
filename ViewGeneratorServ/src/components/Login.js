import React, { useState } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import email_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"
import display_image from "./Assets/displayimg.png"
import { useNavigate } from "react-router-dom"

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const navigate = useNavigate()
    const emailError = document.querySelector(".email.error")
    const passwordError = document.querySelector(".password.error")

    const onSubmit = async (e) => {
        e.preventDefault()
        //reset errors
        emailError.textContent = ""
        passwordError.textContent = ""

        // Check if any field is empty
        if (!email || !password) {
            setShowAlert(true)
            return
        }

        // Reset the alert state
        setShowAlert(false)

        // Continue with form submission

        try {
            await axios.post("http://localhost:3000/login", {
                email,
                password,
            })
            // Call onLogin to notify the parent component of successful login
    props.onLogin();
    
            navigate("/home")
            setEmail("")
            setPassword("")
        } catch (err) {
            console.log(err.response.data)
            emailError.textContent = err.response.data.email
            passwordError.textContent = err.response.data.password
        }
    }

    return (
        <div
            style={{
                backgroundColor: "#FFFFFF",
                padding: "30px",
                height: "100vh",
            }}
        >
            <div className="row">
                <div
                    className="col-md-6 d-flex align-items-center justify-content-center"
                    style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                    <div style={{ width: "70%" }}>
                        <h1
                            style={{
                                marginBottom: "20px",
                                marginLeft: "180px",
                                marginTop: "30px",
                            }}
                        >
                            Login
                        </h1>
                        <h6
                            style={{
                                marginBottom: "30px",
                                textAlign: "center",
                                fontSize: "17px",
                            }}
                        >
                            Log in to Unlock and Share your Visual Stories
                        </h6>
                        {showAlert && (
                            <div className="alert alert-danger" role="alert">
                                Please fill in all fields before submitting.
                            </div>
                        )}
                        <div className="card" style={{ width: "100%" }}>
                            <div className="card-body">
                                <form
                                    onSubmit={onSubmit}
                                    className="d-flex flex-column align-items-left"
                                    style={{
                                        backgroundColor: "#fff",
                                        padding: "20px",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <div className="mb-4 d-flex align-items-center">
                                        <img
                                            src={email_icon}
                                            alt="Email :"
                                            className="me-3"
                                        />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="form-control"
                                        />
                                    </div>

                                    <div className="email error"></div>
                                    <div className="mb-3 d-flex align-items-center">
                                        <img
                                            src={password_icon}
                                            alt="Password :"
                                            className="me-3"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="password error"></div>
                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        style={{
                                            width: "150px",
                                            marginLeft: "120px",
                                        }}
                                    >
                                        Submit
                                    </button>
                                </form>
                                <p
                                    className="mt-1"
                                    style={{ marginLeft: "140px" }}
                                >
                                    New Here?{" "}
                                    <a
                                        style={{
                                            color: "blue",
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                        }}
                                        onClick={() => navigate("/signup")}
                                    >
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 d-flex">
                    <img
                        src={display_image}
                        alt="Your Picture"
                        className="img-fluid"
                        style={{ marginTop: "90px" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
