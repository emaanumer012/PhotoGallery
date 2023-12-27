import axios from "axios"

export const setAuthToken = (token) => {
    if (token) {
        // If a token is provided, set it in the Authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
        // If no token is provided, remove the Authorization header
        delete axios.defaults.headers.common["Authorization"]
    }
}

export default setAuthToken
