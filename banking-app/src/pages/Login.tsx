import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../features/ui/Button/Button";
import "../features/login/Login.css";

const Login: React.FC<any> = () => {
	const user = {
		id: 0,
		email: "",
		password: "",
	};

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
			navigate("");
		}
	};

	return (
		<div className="login">
			<div className="container flex-column">
				<h1>Welcome Back to Revature Bank</h1>
				<h3>Sign in to view your Revature Points</h3>
				<div>
					<input
						type="text"
						name="email"
						placeholder="email"
						onChange={gatherInput}
					/>
				</div>
				<div>
					<input
						type="password"
						name="password"
						placeholder="password"
						onChange={gatherInput}
					/>
				</div>
				<div className="center">
					<Button className="btn" onClick={login}>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Login;
