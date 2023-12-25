import "./App.css"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import "bootstrap/dist/css/bootstrap.css"
import { useState } from "react"
import Dashboard from "./components/Dashboard"
import { Routes, Route, BrowserRouter as Router} from "react-router-dom"
import StaticPage from "./components/StaticPage"


function App() {
  const [currentForm, setCurrentForm] = useState('Login');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const handleLogin = () => {
    // You need to implement the logic for checking the correctness of the login
    // If the login is correct, toggle the isLoggedIn state
    // Otherwise, handle the incorrect login case accordingly
    // For simplicity, I'll just toggle it for demonstration purposes
    setLoggedIn(!isLoggedIn);
  }

//   return (
//     <Router>
//         <div>
//             <Routes>
//                 <Route path="/home" element={<Dashboard />} />
//                 <Route path="/" element={<Login />} />
//                 <Route path="/signup" element={<SignUp />} />
//             </Routes>
//         </div>
//     </Router>
// )

return (
  <Router>
      <div>
        <StaticPage />
        {/* <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes> */}
      </div>
    </Router>
);




// return (
//   <Router>
//   <div>
//     {
//       isLoggedIn ? (
//         <Dashboard />
//       ) : (
//         currentForm === 'Login' ? (
//           <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
//         ) : (
//           <SignUp onFormSwitch={toggleForm} />
//         )
//       )
//     }
//   </div>
//   </Router>
 
// );


}


export default App;


