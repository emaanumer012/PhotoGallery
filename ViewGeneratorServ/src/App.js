import "./App.css"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import "bootstrap/dist/css/bootstrap.css"
import { useEffect, useState } from "react"
import Dashboard from "./components/Dashboard"
import { Routes, Route, BrowserRouter as Router } from "react-router-dom"
import StaticPage from "./components/StaticPage"
import Error404 from "./components/Error404"
import AboutUs from "./components/AboutUs"
import Monitoring from "./components/Monitoring"


function App() {
    const [isLoggedIn, setLoggedIn] = useState(false)
    

    const handleLogin = () => {
        setLoggedIn(!isLoggedIn)
    }

    let auth = localStorage.getItem("authToken");
    const authToken = auth && JSON.parse(auth);
    useEffect(()=>{
        if (!authToken && window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/about' && window.location.pathname !== '/signup') {
            window.location.href = '/';
        }
    },[])

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<StaticPage />} />
                    
                    <Route path="/login" element={<Login onLogin={handleLogin} />}
 />
                    <Route path="/signup" element={<SignUp />} />
                
                        <Route
                            path="/home"
                            element={<Dashboard id={authToken?.user} name={authToken?.name} />}
                        />
                        <Route path="/monitoring" element={<Monitoring />} />
               
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/404" element={<Error404 />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
