import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

/*
This is the layout for every single page
*/
const Layout: React.FC<any> = () => {
	return (
		<>
			<header className="mainHeader">
				<h1>Revature Bank</h1>
				<nav>
					<Link to="">Home</Link>
					<Link to="profile">Profile</Link>
					<Link to="accounts">Accounts</Link>
					<Link to="settings">Settings</Link>
				</nav>
				<nav>
					<Link to="login">Login</Link>
					<Link to="register">Register</Link>
				</nav>
			</header>
			<div className="container">
				{/* This links to the appropriate page component  */}
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
