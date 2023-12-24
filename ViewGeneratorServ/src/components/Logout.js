import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()

    const logout = async () => {
        await axios.get("http://localhost:3000/logout")
        navigate("/")
    }
    return (
        <div>
            <a onClick={logout} className="nav-link text-light">
                Logout
            </a>
        </div>
    )
}

export default Logout
