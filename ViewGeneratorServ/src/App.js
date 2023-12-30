import "./App.css"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import "bootstrap/dist/css/bootstrap.css"
import { useState } from "react"
import Dashboard from "./components/Dashboard"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import StaticPage from "./components/StaticPage"
import Error404 from "./components/Error404"
import AboutUs from "./components/AboutUs"
import Monitoring from "./components/Monitoring"

function App() {
    const [currentForm, setCurrentForm] = useState("Login")
    const [isLoggedIn, setLoggedIn] = useState(false)

    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }

    const handleLogin = () => {
        // You need to implement the logic for checking the correctness of the login
        // If the login is correct, toggle the isLoggedIn state
        // Otherwise, handle the incorrect login case accordingly
        // For simplicity, I'll just toggle it for demonstration purposes
        setLoggedIn(!isLoggedIn)
    }

    let auth= localStorage.getItem("authToken");
    const authToken = JSON.parse(auth);

    // let name = localStorage.getItem("authToken.name");

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<StaticPage />} />
                    <Route
                        path="/home"
                        element={<Dashboard id={authToken.user} name={authToken.name} />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/monitoring" element={<Monitoring />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/404" element={<Error404 />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
