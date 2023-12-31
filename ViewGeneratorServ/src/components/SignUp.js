import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import user_icon from "./Assets/person.png"
import email_icon from "./Assets/email.png"
import password_icon from "./Assets/password.png"
import display_image from "./Assets/displayimg.png"
import setAuthToken from "../utils/setAuthToken"

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const emailError = document.querySelector(".email.error")
    const passwordError = document.querySelector(".password.error")
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()

        //reset errors
        emailError.textContent = ""
        passwordError.textContent = ""

        if (!name || !email || !password) {
            setShowAlert(true)
            return
        }

        setShowAlert(false)

        try {
            const res = await axios.post("http://liamevault.com/signup", {
                name,
                email,
                password,
            })
            console.log(res.data)
            const jsonObject = JSON.stringify(res.data);
            localStorage.setItem("authToken",jsonObject);
            // const token = res.data.token
            // Set the authentication token
            // setAuthToken(token)
            window.location.href = '/home'
        } catch (err) {
            // console.log(err.response.data)
            emailError.textContent = err.response.data.email
            passwordError.textContent = err.response.data.password
        }
        setName("")
        setEmail("")
        setPassword("")
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
                        <h1 className="text-center mt-3">Sign Up</h1>
                        <p className="text-center mb-4">
                            Embark on a visual journey – your moments, your
                            gallery, your story. Register Today!
                        </p>
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
                                            src={user_icon}
                                            alt="Name :"
                                            className="me-3"
                                        />
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            className="form-control"
                                        />
                                    </div>
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
                                    style={{ marginLeft: "120px" }}
                                >
                                    Already a member?{" "}
                                    <a
                                        style={{
                                            color: "blue",
                                            cursor: "pointer",
                                            textDecoration: "underline",
                                        }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Sign In
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

export default SignUp
