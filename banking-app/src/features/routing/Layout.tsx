import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { getUser, logout } from "../users/users.slice";
import "./Layout.css";

/*
This is the layout for every single page
*/
const Layout: React.FC<any> = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUser);

	const handleLogout = () => {
		dispatch(logout());
	};

	useEffect(() => {}, [user]);

	return (
		<>
			<header className="mainHeader">
				<h1>Revature Bank</h1>
				<nav>
					{user?.id >= 0 && (
						<>
							<Link to="accounts">Accounts</Link>
							<Link to="settings">Settings</Link>
						</>
					)}
				</nav>
				<nav>
					{user?.id >= 0 ? (
						<Link to="/" onClick={handleLogout}>
							Logout
						</Link>
					) : (
						<>
							<Link to="login">Login</Link>
							<Link to="register">Register</Link>
						</>
					)}
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
