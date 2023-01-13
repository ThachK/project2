import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../features/Register/Register.css";
import Button from "../features/ui/Button/Button";

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
		<div className="register">
			<div className="container flex-column">
				<h1>Welcome to Revature Bank</h1>
				<h3>Please enter your personal information</h3>
				<div>
					<input
						type="text"
						name="fname"
						placeholder="First Name"
						onChange={gatherInput}
					/>
				</div>
				<div>
					<input
						type="text"
						name="lname"
						placeholder="Last Name"
						onChange={gatherInput}
					/>
				</div>
				<h3>Please enter your email and password</h3>
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
				<div>
					<Button className="btn" maxWidth>
						Register
					</Button>
				</div>
			</div>
			<div className="register-footer">
				<footer> Welcome to the Revature Family! </footer>
			</div>
		</div>
	);
};

export default Register;
