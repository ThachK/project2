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
function App() {
	return (
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
	);
}

export default App;
