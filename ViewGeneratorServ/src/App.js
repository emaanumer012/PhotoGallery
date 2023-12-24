import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./Dashboard";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

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

  return (
    <div>
      {
        isLoggedIn ? (
          <Dashboard />
        ) : (
          currentForm === 'Login' ? (
            <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
          ) : (
            <SignUp onFormSwitch={toggleForm} />
          )
        )
      }
    </div>
   
  );
}

export default App;


