import React, { useState } from "react"
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        await axios.post("http://localhost:3000/login", {
            email,
            password,
        })
        setEmail("")
        setPassword("")
    }

    return (
        <form onSubmit={onSubmit}>
            <h3>Login</h3>
            <label htmlFor="email">Email:</label>
            <br />
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Password:</label>
            <br />
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password error"></div>
            <br />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login
