import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login: React.FC<any> = () => {

    const user = {
        id:0,
        email: "",
        password: ""
    }

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const gatherInput = (input:any) => {
        if(input.target.name === "email"){
            setEmail(input.target.value)
        }else{
            setPassword(input.target.value)
        }
    }


    const login = async () => {
        const response = await axios.post("http//localhost:5000/auth", {email, password})

        if(response.status === 202) {
            console.log(response)

            user.id = response.data.id;
            user.email = response.data.email;
            user.password = response.data.password;

        }

        if(user.id > 0){
            navigate("/home")
        }

    }

  return (
    <div className="Login">
        <div className="text-container">
            <h1>Welcome to Revature Bank</h1>
            <h3>Sign in to view your Revature Points</h3>

            <div className="input-container">
                <input type="text" name="email" placeholder="email" onChange={gatherInput} />
            </div>

            <div className="input-container">
                <input type="password" name="password" placeholder="password" onChange={gatherInput}/>
            </div>

            <button className="login-button" >Log In</button>

        </div>
    </div>
  )
}

export default Login