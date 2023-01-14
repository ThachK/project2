import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./features/routing/Layout";
import Account from "./pages/Account";
import Accounts from "./pages/Accounts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import './darkMode.css';
import { useState, useEffect } from "react";

function App() {
	const [theme, setTheme] = useState(
		localStorage.getItem('theme') || 'light'
	);
	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}	;
	useEffect(() => {
		localStorage.setItem('theme', theme);
		document.body.className = theme;
	}, [theme]);
	return (
		<div>
		<Routes>
			<Route path="" element={<Layout />}>
				{/* index means it is the root */}
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="accounts">
					<Route index element={<Accounts />} />
					<Route path=":id" element={<Account />} />
				</Route>
				<Route path="profile" element={<Profile />} />
				<Route path="settings" element={<Settings />} />
				<Route path="*" element={<Navigate to="" />} />
			</Route>
		</Routes>
		</div>
	);
}

export default App;
