import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../features/ui/Button/Button";
import "../features/login/Login.css";
import { getStatus, login, setStatus } from "../features/users/users.slice";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../features/toasts/toasts.slice";

const Login: React.FC<any> = () => {
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();

	const status = useSelector(getStatus);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e: any) => {
		e.preventDefault();

		// validating fields
		if (!email || !password) {
			dispatch(
				addToast({
					status: "warning",
					message: "Please enter email and password.",
				})
			);
		} else {
			const body = {
				email,
				password,
			};
			try {
				await dispatch(login(body));
			} catch (err: any) {
				dispatch(
					addToast({
						status: "error",
						message: "Unable to login at this time.",
					})
				);
			}
		}
	};

	// listen for status change in users slice
	useEffect(() => {
		if (status === "success") {
			// reset form
			setEmail("");
			setPassword("");

			// navigate
			navigate("/accounts");

			// reset the status
			dispatch(setStatus("idle"));

			dispatch(
				addToast({
					status: "success",
					message: "You have been logged in.",
				})
			);
		} else if (status === "rejected") {
			dispatch(
				addToast({
					status: "error",
					message: "Unable to login: invalid credentials.",
				})
			);
			dispatch(setStatus("idle"));
		}
	}, [status]); // eslint-disable-line

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
