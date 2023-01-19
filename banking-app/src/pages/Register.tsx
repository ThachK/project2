import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../features/Register/Register.css";
import Button from "../features/ui/Button/Button";
import { register } from "../features/users/users.slice";

const Register: React.FC<any> = () => {
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");

	const getMissingFields = () => {
		const result: any = [];

		if (!firstName) {
			result.push("First Name");
		}
		if (!lastName) {
			result.push("Last Name");
		}
		if (!email) {
			result.push("Email");
		}
		if (!password) {
			result.push("Password");
		}
		if (!confirmPassword) {
			result.push("Confirm Password");
		}
		if (!phoneNumber) {
			result.push("Phone Number");
		}
		if (!address) {
			result.push("Address");
		}

		return result;
	};

	const handleLogin = async (e: any) => {
		e.preventDefault();

		// form validation
		const missingFields = getMissingFields();
		if (missingFields.length > 0) {
			alert(
				`Please enter valid information for the following fields: ${missingFields}`
			);
		} else {
			// check if passwords match
			if (password !== confirmPassword) {
				alert("Error: passwords do not match.");
			} else {
				const body = {
					firstName,
					lastName,
					email,
					password,
					phoneNumber,
					address,
				};

				// TODO: implement register logic
				dispatch(register(body));

				alert("You have created a new account.");

				// reset field
				setFirstName("");
				setLastName("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
				setPhoneNumber("");
				setAddress("");

				// redirect to the login page
				navigate("/login");
			}
		}
	};

	return (
		<div className="register">
			<div className="container flex-column">
				<h1>Welcome to Revature Bank</h1>

				<form className="flex-column" autoComplete="off">
					<div className="flex-row">
						<label htmlFor="firstName">First Name:</label>
						<input
							type="text"
							id="firstName"
							value={firstName}
							onChange={(e: any) => setFirstName(e.target.value)}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="lastName">Last Name:</label>
						<input
							type="text"
							id="lastName"
							value={lastName}
							onChange={(e: any) => setLastName(e.target.value)}
						/>
					</div>
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
					<div className="flex-row">
						<label htmlFor="confirmPassword">Confirm Password:</label>
						<input
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e: any) => setConfirmPassword(e.target.value)}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="phoneNumber">Phone Number:</label>
						<input
							type="number"
							id="phoneNumber"
							value={phoneNumber}
							onChange={(e: any) => setPhoneNumber(e.target.value)}
						/>
					</div>
					<div className="flex-row">
						<label htmlFor="address">Address:</label>
						<input
							type="text"
							id="address"
							value={address}
							onChange={(e: any) => setAddress(e.target.value)}
						/>
					</div>
					<Button onClick={handleLogin} maxWidth>
						Create Account
					</Button>
				</form>
			</div>
			<div className="register-footer">
				<footer> Welcome to the Revature Family! </footer>
			</div>
		</div>
	);
};

export default Register;
