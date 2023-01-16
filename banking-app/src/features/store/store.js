import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../accounts/accounts.slice";
import usersReducer from "../users/users.slice";

export const store = configureStore({
	reducer: {
		accounts: accountsReducer,
		users: usersReducer,
	},
});
