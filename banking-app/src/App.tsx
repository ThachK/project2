import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { fetchAccountsById } from "./features/accounts/accounts.slice";
import Layout from "./features/routing/Layout";
import { getUser, setUser } from "./features/users/users.slice";
import Account from "./pages/Account";
import Accounts from "./pages/Accounts";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

function App() {
	const dispatch = useDispatch<any>();
	const user = useSelector(getUser);

	useEffect(() => {
		dispatch(setUser());
	}, []); // eslint-disable-line

	useEffect(() => {
		if (user?.userId) {
			dispatch(fetchAccountsById(user.userId));
		}
	}, [user]); // eslint-disable-line

	return (
		<Routes>
			<Route path="" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="accounts">
					<Route index element={<Accounts />} />
					<Route path=":id" element={<Account />} />
				</Route>
				<Route path="settings" element={<Settings />} />
				<Route path="*" element={<Navigate to="" />} />
			</Route>
		</Routes>
	);
}

export default App;
