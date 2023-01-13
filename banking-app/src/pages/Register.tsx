import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../features/Register/Register.css";



const Register: React.FC<any> = () => {
	const user = {
		id: 0,
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};

	const [firstName, setFirst] = useState("");
	const [lastName, setLast] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const gatherInput = (input: any) => {
		if (input.target.name === "email") {
			setEmail(input.target.value);
		} else {
			setPassword(input.target.value);
		}
	};

	const login = async () => {
		const response = await axios.post("http//localhost:5000/auth", {
			email,
			password,
		});

		if (response.status === 202) {
			console.log(response);

			user.id = response.data.id;
			user.email = response.data.email;
			user.password = response.data.password;
		}

		if (user.id > 0) {
			navigate("/home");
		}
	};

	return (
		<div className="Register">
			<div className="text-container">
				<h1>Welcome to Revature Bank</h1>
				<br></br>
				<div>Please enter your personal information</div>
				<div className="register_input">
					<input
						type="text"
						name="fname"
						placeholder="First Name"
						onChange={gatherInput}
					/>
				</div>
				<div className="register_input">
					<input
						type="text"
						name="lname"
						placeholder="Last Name"
						onChange={gatherInput}
					/>
				</div>
				<br></br>
				<div>Please enter your email/passowrd</div>
				<div className="register_input">
					<input
						type="text"
						name="email"
						placeholder="email"
						onChange={gatherInput}
					/>
				</div>
				<div className="register_input">
					<input
						type="password"
						name="password"
						placeholder="password"
						onChange={gatherInput}
					/>
				</div>
				<br></br>
				<button className="login-button">Register</button>
				<br></br>
				<br></br>
				<img src = {require("../pics/register.jpg")} alt = "Image"></img>
				<div className="register_footer">Welcome to the Revature Family!</div>
			</div>
		</div>
		
	);
};

export default Register;
