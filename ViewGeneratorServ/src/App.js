import "./App.css"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from "react"
import Dashboard from "./Dashboard"

function App() {
    const [currentForm, setCurrentForm] = useState('Login');

    const toggleForm = (formName) =>{
        setCurrentForm(formName)
    }
    return (
        <div>
            {
                currentForm === 'Login' ? <Login onFormSwitch={toggleForm}/> : <SignUp onFormSwitch={toggleForm}/>
            }
        </div>

        //<Dashboard/>

    )
}

export default App
