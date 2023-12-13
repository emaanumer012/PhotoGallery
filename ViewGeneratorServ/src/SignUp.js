import React, { useState, useEffect } from "react"
import axios from "axios"
const SignUp = () => {
    const [users, setUsers] = useState({})
    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:3000/signup")
        setUsers(res.data)
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    const renderedUsers = Object.values(users).map((user) => {
        return <p>{user.username}</p>
    })
    console.log(renderedUsers)
    return <div>{renderedUsers}</div>
}

export default SignUp
