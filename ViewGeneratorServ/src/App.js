import "./App.css"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import "bootstrap/dist/css/bootstrap.css"
import { useState } from "react"
import Dashboard from "./components/Dashboard"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"

function App() {
    const [currentForm, setCurrentForm] = useState("Login")

    const toggleForm = (formName) => {
        setCurrentForm(formName)
    }
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
