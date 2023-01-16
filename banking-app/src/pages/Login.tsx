import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../features/ui/Button/Button";
import "../features/login/Login.css";
import { login } from "../features/users/users.slice";
import { useDispatch } from "react-redux";

const Login: React.FC<any> = () => {
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: any) => {
		e.preventDefault();

		// validating fields
		if (!email || !password) {
			alert("Please enter an email and password");
		} else {
			const body = {
				email,
				password,
			};
			try {
				await dispatch(login(body));

				alert("You have logged in.");

				// reset form
				setEmail("");
				setPassword("");

				// navigate
				navigate("/accounts");
			} catch (err: any) {
				alert(`Unabled to login: ${err.message}`);
			}
		}
	};

	return (
		<div className="login">
			<div className="container flex-column">
				<h1>Welcome Back to Revature Bank</h1>
				<h3>Sign in to view your Revature Points</h3>
				<form className="flex-column">
					<div className="flex-row">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e: any) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e: any) => setPassword(e.target.value)}
						/>
					</div>
					<div className="center">
						<Button className="btn" onClick={handleLogin} maxWidth>
							Login
						</Button>
					</div>
				</form>
				<div className="login-footer">
					<footer> Welcome to the Revature Family! </footer>
				</div>
			</div>
		</div>
	);
};

export default Login;
